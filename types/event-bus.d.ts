export type EventCallback<TD> = (data: TD) => void

export interface EventSubscriptionOptions {
  fireOnce: boolean
}

interface EventSubscriberOptions extends EventSubscriptionOptions {
  callCount: number
}

type EventUnsubscribe = () => void

interface EventSubscribersMap<TD> extends Map<EventCallback<TD>, EventSubscriberOptions> {}

export interface EventSubscribersObject<TD> {
  [topic: string]: EventSubscribersMap<TD>
}

export type EventSubscribers<TD> = EventSubscribersMap<TD> | EventSubscribersObject<TD>

export declare class EventBus<TD> {
  subscribe (event: string, callback: EventCallback<TD>, options?: EventSubscriptionOptions): EventUnsubscribe
  publish (event: string, data: TD): EventSubscribersMap<TD> | []
  getSubscribers (topic?: string): EventSubscribers<TD>
}

export declare function createEventBus<TD> (): EventBus<TD>

export declare function getEventBus<TD> (): EventBus<TD>

declare global {
  var __ficusjs__: {
    eventBus: EventBus
  }
}
