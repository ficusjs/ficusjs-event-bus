class s{constructor(){if(globalThis.__ficusjs__&&globalThis.__ficusjs__.eventBus)return globalThis.__ficusjs__.eventBus;this.subscribers={},globalThis.__ficusjs__=globalThis.__ficusjs__||{},globalThis.__ficusjs__.eventBus=globalThis.__ficusjs__.eventBus||this}getSubscribers(s){return s?this.subscribers[s]:this.subscribers}subscribe(s,e,r={}){const t=this,u={callCount:0,fireOnce:!1,...r};t.subscribers[s]||(t.subscribers[s]=new Map);return t.subscribers[s].set(e,u),()=>{const r=new Map;t.subscribers[s].forEach(((s,t)=>t!==e&&r.set(t,s))),t.subscribers[s]=r}}publish(s,e){if(!this.subscribers[s])return[];const r=new Map;return this.subscribers[s].forEach(((s,t)=>{s.fireOnce&&1===s.callCount||(t(e),++s.callCount,r.set(t,s))})),r}}function createEventBus(){return new s}function getEventBus(){return createEventBus()}export{createEventBus,getEventBus};
