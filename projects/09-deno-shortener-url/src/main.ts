import { render } from "npm:preact-render-to-string";
import { serveDir } from "@std/http";
import { createGitHubOAuthConfig, createHelpers } from "jsr:@deno/kv-oauth";

import { Router } from "./router.ts";
import { generateShortCode, storeShortLink, getUserLinks } from "./db.ts";
import { HomePage, UnauthorizedPage, CreateShortlinkPage, LinksPage } from "./ui.tsx";
import { handleGithubCallback } from "./auth.ts";

const app = new Router();

const oauthConfig = createGitHubOAuthConfig({
  redirectUri: Deno.env.get('REDIRECT_URI')
});
const {
  signIn,
  signOut,
} = createHelpers(oauthConfig);

app.get("/oauth/signin", (req: Request) => signIn(req));
app.get("/oauth/signout", signOut);
app.get("/oauth/callback", handleGithubCallback);

function unauthorizedResponse() {
  return new Response(render(UnauthorizedPage()), {
    status: 401,
    headers: {
      "content-type": "text/html",
    },
  });
}

app.get("/", () => {
  return new Response(
    render(HomePage({ user: app.currentUser })), 
    {
    status: 200,
    headers: {
      "content-type": "text/html",
    },
  });
});

app.post('/health-check', () => new Response("It's ALIVE!"))

// app.post("/links", async (req) => {
//   const { longUrl } = await req.json()
//   const shortCode = await generateShortCode(longUrl);

//   await storeShortLink(longUrl, shortCode, 'testUser');

//   return new Response("success!", {
//     status: 201,
//   });
// });


// app.get("/links/:id", async (_req, _info, params) => {
//   // @ts-expect-error - params is typed as Record<string, string>, but we know it has a groups property
//   const shortCode = params?.pathname.groups.id;
//   const data = await getShortLink(shortCode!)

//   return new Response(JSON.stringify(data), {
//     status: 201,
//     headers: {
//       "content-type": "application/json",
//     },

//   });

// })

app.get("/links/new", (_req) => {
  if (!app.currentUser) return unauthorizedResponse();

  return new Response(render(CreateShortlinkPage()), {
    status: 200,
    headers: {
      "content-type": "text/html",
    },
  });
});


app.post("/links", async (req) => {
  if (!app.currentUser) return unauthorizedResponse();

  // Parse form data
  const formData = await req.formData();
  const longUrl = formData.get("longUrl") as string;

  if (!longUrl) {
    return new Response("Missing longUrl", { status: 400 });
  }

  const shortCode = await generateShortCode(longUrl);
  await storeShortLink(longUrl, shortCode, app.currentUser.login);

  // Redirect to the links list page after successful creation
  return new Response(null, {
    status: 303,
    headers: {
      "Location": "/links",
    },
  });
});

app.get("/links", async () => {
  if (!app.currentUser) return unauthorizedResponse();

  const shortLinks = await getUserLinks(app.currentUser.login);

  return new Response(render(LinksPage({ shortLinkList: shortLinks })), {
    status: 200,
    headers: {
      "content-type": "text/html",
    },
  });
});

// Static Assets
app.get("/static/*", (req) => serveDir(req));

export default {
  fetch(req) {
    return app.handler(req);
  },
} satisfies Deno.ServeDefaultExport;
