![GitHub package.json version](https://img.shields.io/github/package-json/v/thzero/library_client_firebase_svelte)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# library_client_firebase_svelte

Svelte integration for [library_client_firebase](https://github.com/thzero/library_client_firebase): a starter that initializes Firebase authentication, and a `requiresAuth` condition for protecting routes with [svelte-spa-router](https://github.com/ItalyPaleAle/svelte-spa-router).

## Requirements

### NodeJs

[NodeJs](https://nodejs.org) version 22+.

## Installation

[![NPM](https://nodei.co/npm/@thzero/library_client_firebase_svelte.png?compact=true)](https://npmjs.org/package/@thzero/library_client_firebase_svelte)

```
npm install @thzero/library_client_firebase_svelte
```

It installs `@thzero/library_client_firebase` and `firebase`, and requires `@thzero/library_client`, `@thzero/library_client_svelte` and `@thzero/library_common` as peers. Set up Firebase and the configuration as described in [library_client_firebase](https://github.com/thzero/library_client_firebase#firebase-setup), and register its authentication service.

## Usage

Run the starter during boot:

```js
import bootStarter from '@thzero/library_client_firebase_svelte/boot/starter';
```

### Protecting routes

svelte-spa-router has no global route guard, so a route is protected by passing `requiresAuth` as a condition to `wrap()`:

```js
import { wrap } from 'svelte-spa-router/wrap';

import { requiresAuth } from '@thzero/library_client_firebase_svelte/boot/starter';

const routes = {
	'/settings': wrap({
		component: Settings,
		conditions: [ requiresAuth ]
	})
};
```

`requiresAuth` passes when the user is signed in. The router's `conditionsFailed` event decides where to send a user who fails it. Role checks are not wired in; call the authentication service's `resolveAuthorization` from a condition of your own if a route needs them.

## Development

```
npm install
npm test
npm run lint
```

Tests use [Vitest](https://vitest.dev); the `test` folder and the configuration files are not published. Installing currently needs `npm install --force`, until `@thzero/library_client_firebase` is published with `@thzero/library_common ^0.19`.

## License

[MIT](license.md)
