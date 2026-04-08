import { route, type Route } from "@std/http/unstable-route";
import { serveDir } from "@std/http/file-server";

const routes: Route[] = [
  {
    pattern: new URLPattern({ pathname: '/' }),
    handler: () => new Response('Home page'),
  },
  {
    pattern: new URLPattern({ pathname: '/user/:id' }),
    handler: (req: Request, info: unknown, params: any) =>
      new Response(params?.pathname.groups.id),
  },
  {
    pattern: new URLPattern({ pathname: '/static/*' }),
    handler: (req: Request) => serveDir(req),
  },
]

function defaultHandler() {
  return new Response('Not found', { status: 404 })
}

const handler = route(routes, defaultHandler)

export default {
  fetch(req) {
    return handler(req)
  },
} satisfies Deno.ServeDefaultExport
