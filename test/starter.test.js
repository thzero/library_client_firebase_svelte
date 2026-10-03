import { beforeEach, describe, expect, it, vi } from 'vitest';

import LibraryClientConstants from '@thzero/library_client/constants';
import LibraryClientUtility from '@thzero/library_client/utility/index';

import starter, { requiresAuth } from '../boot/starter';

describe('starter', () => {
	let auth;

	beforeEach(() => {
		auth = {
			initialize: vi.fn(async () => true),
			isAuthenticated: vi.fn(async () => true)
		};
		LibraryClientUtility.$injector = { getService: (key) => (key === LibraryClientConstants.InjectorKeys.SERVICE_AUTH ? auth : null) };
	});

	it('initializes the auth service with the router', async () => {
		const router = { name: 'router' };

		await starter({ router });

		// it passed a vue-router callback where { router } is expected
		expect(auth.initialize).toHaveBeenCalledWith(expect.any(String), router);
	});

	it('requiresAuth passes a signed-in user', async () => {
		expect(await requiresAuth()).toBe(true);
		expect(auth.isAuthenticated).toHaveBeenCalled();
	});

	it('requiresAuth refuses when nobody is signed in', async () => {
		auth.isAuthenticated.mockResolvedValue(false);

		expect(await requiresAuth()).toBe(false);
	});
});
