export function withEventBus (eventBus, options) {
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
    setEventBus (eventBus) {
      const self = this
      self._eventBus = eventBus
      self._eventSubscriptions = {}
      self.eventBus = {
        subscribe (event, callback, options) {
          self._eventSubscriptions[event] = { unsubscribe: self._eventBus.subscribe(event, callback, options), callback, options }
          return function () {
            const { unsubscribe } = self._eventSubscriptions[event]
            unsubscribe && unsubscribe()
            self._eventSubscriptions[event].unsubscribe = null
          }
        },
        publish (event, data = {}) {
          self._eventBus.publish(event, data)
        },
        getSubscribers (topic) {
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
