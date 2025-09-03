import { H3Event, defineEventHandler } from 'h3';

// NOTE: now that Nuxt 4 uses an app directory import routes for Nitro need to be configured specifically, in the current configuration one should use '~' to refer to the server directory, and '@' to refer to the app directory.
import { returnHello } from '../utils/operations';

export default defineEventHandler((event: H3Event) => {
  // NOTE: Middleware handlers will run on every request before any other server route to add or check headers, log requests, or extend the event's request object. Middleware handlers should not return anything (nor close or respond to the request) and only inspect or extend the request context or throw an error.
  console.log(returnHello('Server Middleware'), event.__is_event__);
});
