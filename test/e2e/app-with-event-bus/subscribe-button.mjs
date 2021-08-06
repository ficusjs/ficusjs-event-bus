import { html, createCustomElement, withEventBus, withLocalState } from '../util/component.mjs'
import { eventBus } from './events.mjs'

createCustomElement('subscribe-button',
  withEventBus(eventBus,
    withLocalState({
      state () {
        return { count: 0 }
      },
      mounted () {
        this.eventBus.subscribe('increment', () => {
          this.state.count = this.state.count + 1
        })
      },
      render () {
        return html`<div>You have clicked ${this.state.count} times!</div>`
      }
    })
  )
)
