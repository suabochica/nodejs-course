import { Router } from "./router.ts";

const app = new Router();

app.get('/', () => new Response('Hi Mom!'))

app.post('/health-check', () => new Response("It's ALIVE!"))

export default {
  fetch(req) {
    return app.handler(req);
  },
} satisfies Deno.ServeDefaultExport;
