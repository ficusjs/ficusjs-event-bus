import { html, createCustomElement, withEventBus } from '../util/component.mjs'
import { eventBus } from './events.mjs'

import './publish-button.mjs'
import './subscribe-button.mjs'

createCustomElement(
  'mock-app-with-events',
  withEventBus(eventBus, {
    render () {
      return html`<div>
        <publish-button></publish-button>
        <subscribe-button></subscribe-button>
      </div>`
    }
  })
)
