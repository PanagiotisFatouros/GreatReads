import { expect, test } from '@playwright/test';
import { readGoogleBooksResponse } from '../src/lib/scripts.js';
import { googleBooksResponse, expectedResponse } from './values.js';


test('Test json parse of google books response', ({ }) => {
	let response = readGoogleBooksResponse(googleBooksResponse);
	expect(response).toEqual(expectedResponse);
});
