import { Router } from "./router.ts";
import { generateShortCode, storeShortLink, getShortLink } from "./db.ts";
import { HomePage } from "./ui.tsx";
import { render } from "npm:preact-render-to-string";


const app = new Router();


app.get("/", () => {
  return new Response(
    render(HomePage({user: null })), 
    {
    status: 200,
    headers: {
      "content-type": "text/html",
    },
  });
});

// app.get('/', () => new Response('Hi Mom!'))


app.post('/health-check', () => new Response("It's ALIVE!"))

app.post("/links", async (req) => {
  const { longUrl } = await req.json()
  const shortCode = await generateShortCode(longUrl);

  await storeShortLink(longUrl, shortCode, 'testUser');

  return new Response("success!", {
    status: 201,
  });
});


app.get("/links/:id", async (_req, _info, params) => {
  // @ts-expect-error - params is typed as Record<string, string>, but we know it has a groups property
  const shortCode = params?.pathname.groups.id;
  const data = await getShortLink(shortCode!)

  return new Response(JSON.stringify(data), {
    status: 201,
    headers: {
      "content-type": "application/json",
    },

  });

})

export default {
  fetch(req) {
    return app.handler(req);
  },
} satisfies Deno.ServeDefaultExport;
