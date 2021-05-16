type EventCallback<TD> = (data: TD) => void

type EventUnsubscribe = () => void

export declare class EventBus<TD> {
  subscribe (event: string, callback: EventCallback<TD>): EventUnsubscribe
  publish (event: string, data: TD): void
}

export declare function createEventBus<TD> (): EventBus<TD>

export declare function getEventBus<TD> (): EventBus<TD>
