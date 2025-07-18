import { H3Event } from 'h3';

export default defineEventHandler((event: H3Event) => {
  // NOTE: Middleware handlers will run on every request before any other server route to add or check headers, log requests, or extend the event's request object. Middleware handlers should not return anything (nor close or respond to the request) and only inspect or extend the request context or throw an error.
  console.log('hello from server middleware', event.__is_event__);
});
