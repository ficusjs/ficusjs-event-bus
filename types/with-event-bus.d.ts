import { EventBus, EventCallback, EventSubscriptionOptions, EventUnsubscribe, EventSubscribers } from './event-bus'
import { CustomElementOptions } from '@ficusjs/core'

export interface FicusComponentWithEventBus<TD> extends HTMLElement {
  eventBus: TD
  setEventBus: (eventBus: EventBus<TD>) => void
}

export declare function withEventBus<TD, TCO> (eventBus: EventBus<TD>, options: CustomElementOptions<TCO>)

export type WithEventBusCustomElementOptions <TD, WT, AT> = CustomElementOptions<WT, AT> & {
  _eventBus: EventBus <TD>
  _eventSubscriptions: { [key: string]: { unsubscribe: EventBus['subscribe'], callback: EventCallback, options?: EventSubscriptionOptions } }
  eventBus: {
    subscribe (event: string, callback: EventCallback<TD>, options?: EventSubscriptionOptions): EventUnsubscribe
    publish (event: string, data: TD): void
    getSubscribers (topic?: string): EventSubscribers<TD>
  }
}
