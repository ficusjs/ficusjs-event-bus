# FicusJS event bus

FicusJS event bus provides functions for a fast, lightweight publish/subscribe event bus.

For communication between components without triggering a re-render, the event bus object provides a topic-based publish/subscribe API.

**The event bus will be created as a singleton - this ensures only one instance exists.**

For documentation visit [https://docs.ficusjs.org/event-bus/](https://docs.ficusjs.org/event-bus/)

## Getting started

The `createEventBus` function creates a new event bus instance.

```js
import { createEventBus } from 'https://cdn.skypack.dev/@ficusjs/event-bus'

const eventBus = createEventBus()
```

The `getEventBus` function returns the default event bus instance.

```js
import { getEventBus } from 'https://cdn.skypack.dev/@ficusjs/event-bus'

const eventBus = getEventBus()
```

The `withEventBus` function creates a new event bus instance and adds it to the context of the component.

```js
import { createCustomElement, createEventBus, withEventBus } from 'https://cdn.skypack.dev/ficusjs@6'
import { html, renderer } from 'https://cdn.skypack.dev/@ficusjs/renderers@5/uhtml'

const eventBus = createEventBus()

// A new component
createCustomElement(
  'my-component',
  withEventBus(eventBus, {
    renderer,
    handleEvent (data) {
      /* handle event here */
    },
    mounted () {
      this.events.subscribe('my-event', this.handleEvent)
    },
    render () {
      /* handle render here */
    }
  })
)
```

## Installation

FicusJS event bus is part of [FicusJS](https://docs.ficusjs.org) but can also be installed independently in a number of ways.

### CDN

We recommend using native ES modules in the browser.

```html
<script type="module">
  import { createEventBus, getEventBus, withEventBus } from 'https://cdn.skypack.dev/@ficusjs/event-bus'
</script>
```

FicusJS event bus is available on [Skypack](https://www.skypack.dev/view/@ficusjs/event-bus).

### NPM

FicusJS event bus works nicely with build tools such as Snowpack, Webpack or Rollup. If you are using a NodeJS tool, you can install the NPM package.

```bash
npm install @ficusjs/event-bus
```

### Available builds

FicusJS event bus only provides ES module builds. For legacy browsers or alternative modules such as CommonJS, it is recommended to use a build tool to transpile the code.

## Development

How to set-up FicusJS event bus for local development.

1. Clone the repository:

```bash
git clone https://github.com/ficusjs/ficusjs-event-bus.git
```

2. Change the working directory

```bash
cd ficusjs-event-bus
```

3. Install dependencies

```bash
npm install
```

4. Run the local development server

```bash
npm run dev
```

That's it! Now open http://localhost:8080 to see a local app.

## License

This project is licensed under the MIT License - see the [`LICENSE`](LICENSE) file for details.

## Contributing to FicusJS event bus

Any kind of positive contribution is welcome! Please help us to grow by contributing to the project.

If you wish to contribute, you can work on any features you think would enhance the library. After adding your code, please send us a Pull Request.

> Please read [CONTRIBUTING](CONTRIBUTING.md) for details on our [CODE OF CONDUCT](CODE_OF_CONDUCT.md), and the process for submitting pull requests to us.

## Support

We all need support and motivation. FicusJS is not an exception. Please give this project a ⭐️ to encourage and show that you liked it. Don't forget to leave a star ⭐️ before you move away.

If you found the library helpful, please consider [sponsoring us](https://github.com/sponsors/ficusjs).
