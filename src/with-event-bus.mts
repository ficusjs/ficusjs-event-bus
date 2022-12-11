import { WithEventBusCustomElementOptions, EventBus, EventSubscriptionOptions, EventCallback } from '../types'

// I was not able to set the options' type to CustomElementOptions, not sure why. I left any for the moment.
// Then in with-event-bus.d.ts the withEventBus function accepts two generics, and only one is passed to CustomElementOptions
// but if I try to do the same, typescript complains because CustomElementOptions needs to have two generics
export function withEventBus <TD, WT, AT> (eventBus: EventBus <TD>, options: any): WithEventBusCustomElementOptions <TD, WT, AT> {
  return {
    ...options,
    created () {
      this.setEventBus(eventBus)
      if (options.created) options.created.call(this)
    },
    mounted () {
      this._subscribeToEventBus()
      if (options.mounted) options.mounted.call(this)
    },
    updated () {
      this._subscribeToEventBus()
      if (options.updated) options.updated.call(this)
    },
    removed () {
      this._unsubscribeFromEventBus()
      if (options.removed) options.removed.call(this)
    },
    setEventBus (eventBus: EventBus <TD>) {
      const self = this
      self._eventBus = eventBus
      self._eventSubscriptions = {}
      self.eventBus = {
        subscribe (event: string, callback: EventCallback<TD>, options?: EventSubscriptionOptions) {
          self._eventSubscriptions[event] = { unsubscribe: self._eventBus.subscribe(event, callback, options), callback, options }
          return function () {
            const { unsubscribe } = self._eventSubscriptions[event]
            unsubscribe && unsubscribe()
            self._eventSubscriptions[event].unsubscribe = null
          }
        },
        publish (event: string, data: TD = {} as TD) {
          // In the docs I can see that eventBus.publish() returns a map of subscribers, but in this case
          // it returns void, should we add a return statement in this function as well?
          self._eventBus.publish(event, data)
        },
        getSubscribers (topic?: string) {
          return self._eventBus.getSubscribers(topic)
        }
      }
    },
    _subscribeToEventBus () {
      for (const k in this._eventSubscriptions) {
        const { unsubscribe, callback, options } = this._eventSubscriptions[k]
        if (!unsubscribe) {
          this._eventSubscriptions[k].unsubscribe = this._eventBus.subscribe(k, callback, options)
        }
      }
    },
    _unsubscribeFromEventBus () {
      for (const k in this._eventSubscriptions) {
        const { unsubscribe } = this._eventSubscriptions[k]
        unsubscribe && unsubscribe()
        this._eventSubscriptions[k].unsubscribe = null
      }
    }
  }
}
