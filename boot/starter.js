import LibraryClientConstants from '@thzero/library_client/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import starter from '@thzero/library_client_firebase/boot/starter';

// svelte-spa-router has no global route guard, so this starter cannot install
// one the way the Vue starter does. (It used to hand the base starter a
// vue-router beforeResolve callback, which was never called.) A route is
// protected by a condition passed to wrap() instead:
//
//   import { wrap } from 'svelte-spa-router/wrap';
//   '/settings': wrap({ component: Settings, conditions: [ requiresAuth ] })
//
// and the router's conditionsFailed event decides where to send the user.
export async function requiresAuth() {
	const auth = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_AUTH);
	return await auth.isAuthenticated();
}

export default async ({
	router
}) => {
	return await starter({ router });
};
