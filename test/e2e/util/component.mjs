import { renderer, html } from 'https://cdn.skypack.dev/@ficusjs/renderers@5/uhtml'
import { createCustomElement as customElementCreator } from 'https://cdn.skypack.dev/@ficusjs/core'
import { withLocalState } from 'https://cdn.skypack.dev/@ficusjs/state'
import { createEventBus, getEventBus, withEventBus } from '../../../src/index.mjs'

function createCustomElement (tagName, options) {
  customElementCreator(tagName, { ...options, renderer })
}

const nothing = ''

export {
  createCustomElement,
  createEventBus,
  getEventBus,
  withEventBus,
  withLocalState,
  html,
  nothing
}
