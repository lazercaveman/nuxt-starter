# Pages directory
In general Nuxt will automatically integrate Vue Router and map pages/ directory into the routes of your application. Unlike components, your **pages must have a single root element** to allow Nuxt to apply route transitions between pages.

## Dynamic routes
If you place anything within square brackets, it will be turned into a dynamic route parameter. You can mix and match multiple parameters and even non-dynamic text within a file name or directory. If you need a catch-all route, you create it by using a file named like [...slug].vue. This will match all routes under that path, and thus it doesn't support any non-dynamic text.
