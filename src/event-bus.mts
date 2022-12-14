import {
  EventSubscriberOptions,
  EventCallback,
  EventSubscribersObject,
  EventUnsubscribe,
  EventSubscribersMap,
  EventSubscribers
} from '../types'

class EventBus<TD> {
  subscribers!: EventSubscribersObject<TD>
  constructor () {
    if (globalThis.__ficusjs__ && globalThis.__ficusjs__.eventBus) {
      return globalThis.__ficusjs__.eventBus
    }
    this.subscribers = {}
    globalThis.__ficusjs__ = globalThis.__ficusjs__ || {}
    globalThis.__ficusjs__.eventBus = globalThis.__ficusjs__.eventBus || this
  }

  /**
   * Return a list of subscribers for a topic. If no topic is passed, all subscribers are returned
   * @method
   * @param topic
   * @returns {Map|object} A Map of subscribers for a topic or object of all subscribers for all topics
   */
  getSubscribers (topic?: string): EventSubscribers<TD> {
    return topic ? this.subscribers[topic] : this.subscribers
  }

  /**
   * Subscribe to a topic
   *
   * @method
   * @param {string} topic
   * @param {function} callback
   * @param {object} options
   * @returns {number} A count of callbacks for this topic
   */
  subscribe (topic: string, callback: EventCallback <TD>, options: { fireOnce?: boolean } = {}): EventUnsubscribe {
    const self = this
    const opts = { callCount: 0, fireOnce: false, ...options }

    // If there's not already an topic with this name set in our collection
    // go ahead and create a new one and set it with an empty array, so we don't
    // have to type check it later down-the-line
    if (!self.subscribers[topic]) {
      self.subscribers[topic] = new Map()
    }

    // create an unsubscribe function
    const unsubscribe = (): void => {
      const newItems: EventSubscribersMap <TD> = new Map()
      self.subscribers[topic].forEach((v: EventSubscriberOptions, k: EventCallback <TD>) => k !== callback && newItems.set(k, v))
      self.subscribers[topic] = newItems
    }

    // add the callback to the map
    self.subscribers[topic].set(callback, opts)

    return unsubscribe
  }

  /**
   * Publish a message to a topic
   *
   * @method
   * @param {string} topic
   * @param {object} data
   * @returns {Map} The subscribers notified by this topic
   */
  publish (topic: string, data: TD): EventSubscribersMap<TD> | [] {
    const self = this

    // There's no topic to publish to, so bail out
    if (!self.subscribers[topic]) {
      return []
    }

    // Get each subscription and call its callback with the passed data
    const published = new Map()
    self.subscribers[topic].forEach((opts: EventSubscriberOptions, callback: EventCallback <TD>) => {
      if (opts.fireOnce && opts.callCount === 1) return
      callback(data)
      ++opts.callCount
      published.set(callback, opts)
    })
    return published
  }
}

/**
 * Function to create an EventBus instance
 * @returns {EventBus}
 */
export function createEventBus () {
  return new EventBus()
}

/**
 * Function to get the running EventBus instance
 * @returns {EventBus}
 */
export function getEventBus () {
  return createEventBus()
}
