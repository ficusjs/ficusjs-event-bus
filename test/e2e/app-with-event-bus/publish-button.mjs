import { html, createCustomElement, withEventBus } from '../util/component.mjs'
import { eventBus } from './events.mjs'

createCustomElement(
  'publish-button',
  withEventBus(eventBus, {
    buttonClicked () {
      this.eventBus.publish('increment', undefined)
    },
    render () {
      return html`<button type="button" onclick=${this.buttonClicked}>Increment</button>`
    }
  })
)
