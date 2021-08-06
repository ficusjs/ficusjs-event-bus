import { html, createCustomElement, withEventBus, withLocalState } from '../util/component.mjs'
import { eventBus } from './events.mjs'

createCustomElement('subscribers-button',
  withEventBus(eventBus,
    withLocalState({
      state () {
        return { subscribers: null }
      },
      buttonClicked () {
        this.state.subscribers = this.eventBus.getSubscribers('increment')
      },
      render () {
        if (this.state.subscribers) {
          return html`
            <ul>
              ${Array.from(this.state.subscribers.keys()).map(k => html`
                <li>
                  <span>Callback: ${(typeof k)}</span>
                  <span>Options: <code>${JSON.stringify(this.state.subscribers.get(k))}</code></span>
                </li>
              `)}
            </ul>
          `
        }
        return html`<button type="button" onclick=${this.buttonClicked}>Get subscribers</button>`
      }
    })
  )
)
