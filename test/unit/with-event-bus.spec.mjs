import test from 'ava'
import sinon from 'sinon'
import { createWrapper } from '../helpers/wrapper.mjs'
import { createEventBus, withEventBus } from '../../src/index.mjs'

test.beforeEach(t => {
  t.context = createWrapper(
    withEventBus(createEventBus(), {
      mounted: sinon.spy(),
      updated: sinon.spy(),
      removed: sinon.spy()
    })
  )
  sinon.spy(t.context, '_subscribeToEventBus')
  sinon.spy(t.context, '_unsubscribeFromEventBus')
})

test('publish event', t => {
  const callback = sinon.spy()
  t.context.eventBus.subscribe('test2', callback)
  t.context.eventBus.publish('test2', 'test2')
  t.truthy(callback.called)
  t.is(callback.getCall(0).args[0], 'test2')
})

test('publish and unsubscribe from event', t => {
  const callback = sinon.spy()
  const unsub = t.context.eventBus.subscribe('test3', callback)
  t.context.eventBus.publish('test3', 'test3')
  t.truthy(callback.called)
  unsub()
  callback.resetHistory()
  t.context.eventBus.publish('test3', 'test4')
  t.falsy(callback.called)
})

test('mounted method', t => {
  t.context.eventBus.subscribe('test4', () => {})
  t.context.mounted()
  t.truthy(t.context._subscribeToEventBus.called)
})

test('updated method', t => {
  t.context.eventBus.subscribe('test5', () => {})
  t.context.updated()
  t.truthy(t.context._subscribeToEventBus.called)
})

test('updated method with existing subscription', t => {
  const unsub = t.context.eventBus.subscribe('test5a', () => {})
  unsub()
  t.context.updated()
  t.truthy(t.context._subscribeToEventBus.called)
})

test('removed method', t => {
  t.context.eventBus.subscribe('test6', () => {})
  t.context.removed()
  t.truthy(t.context._unsubscribeFromEventBus.called)
})
