import { EventBus } from './event'
import { CustomElementOptions } from '@ficusjs/core'

export interface FicusComponentWithEventBus<TD> extends HTMLElement {
  eventBus: TD
  setEventBus: (eventBus: EventBus<TD>) => void
}

export declare function withEventBus<TD, TCO> (eventBus: EventBus<TD>, options: CustomElementOptions<TCO>)
