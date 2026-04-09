import { render } from 'npm:preact-render-to-string'
import { serveDir } from '@std/http'
import { createGitHubOAuthConfig, createHelpers } from 'jsr:@deno/kv-oauth'

import { Router } from './router.ts'
import {
  generateShortCode,
  getShortLink,
  getUserLinks,
  incrementClickCount,
  storeShortLink,
} from './db.ts'
import {
  CreateShortlinkPage,
  HomePage,
  LinksPage,
  ShortlinkViewPage,
  UnauthorizedPage,
} from './ui.tsx'
import { handleGithubCallback } from './auth.ts'

const app = new Router()

const oauthConfig = createGitHubOAuthConfig({
  redirectUri: Deno.env.get('REDIRECT_URI'),
})
const { signIn, signOut } = createHelpers(oauthConfig)

app.get('/oauth/signin', (req: Request) => signIn(req))
app.get('/oauth/signout', signOut)
app.get('/oauth/callback', handleGithubCallback)

function unauthorizedResponse() {
  return new Response(render(UnauthorizedPage()), {
    status: 401,
    headers: {
      'content-type': 'text/html',
    },
  })
}

app.get('/', () => {
  return new Response(render(HomePage({ user: app.currentUser })), {
    status: 200,
    headers: {
      'content-type': 'text/html',
    },
  })
})

app.post('/health-check', () => new Response("It's ALIVE!"))

app.get('/:id', async (req, _info, params) => {
  const shortCode = params.pathname.groups['id']
  const shortLink = await getShortLink(shortCode)

  if (shortLink) {
    // Capture analytics data
    const ipAddress =
      req.headers.get('x-forwarded-for') ||
      req.headers.get('cf-connecting-ip') ||
      'Unknown'
    const userAgent = req.headers.get('user-agent') || 'Unknown'
    const country = req.headers.get('cf-ipcountry') || 'Unknown'

    // Increment click count and store analytics data
    await incrementClickCount(shortCode, {
      ipAddress,
      userAgent,
      country,
    })

    // Redirect to the long URL
    return new Response(null, {
      status: 303,
      headers: {
        Location: shortLink.longUrl,
      },
    })
  } else {
    // Render 404 page
    return new Response(render(NotFoundPage({ shortCode })), {
      status: 404,
      headers: {
        'Content-Type': 'text/html',
      },
    })
  }
})

app.get('/links/new', _req => {
  if (!app.currentUser) return unauthorizedResponse()

  return new Response(render(CreateShortlinkPage()), {
    status: 200,
    headers: {
      'content-type': 'text/html',
    },
  })
})

app.post('/links', async req => {
  if (!app.currentUser) return unauthorizedResponse()

  // Parse form data
  const formData = await req.formData()
  const longUrl = formData.get('longUrl') as string

  if (!longUrl) {
    return new Response('Missing longUrl', { status: 400 })
  }

  const shortCode = await generateShortCode(longUrl)
  await storeShortLink(longUrl, shortCode, app.currentUser.login)

  // Redirect to the links list page after successful creation
  return new Response(null, {
    status: 303,
    headers: {
      Location: '/links',
    },
  })
})

app.get('/links', async () => {
  if (!app.currentUser) return unauthorizedResponse()

  const shortLinks = await getUserLinks(app.currentUser.login)

  return new Response(render(LinksPage({ shortLinkList: shortLinks })), {
    status: 200,
    headers: {
      'content-type': 'text/html',
    },
  })
})

app.get('/links/:id', async (_req, _info, params) => {
  const shortCode = params?.pathname.groups['id']
  const shortLink = await getShortLink(shortCode!)

  return new Response(render(ShortlinkViewPage({ shortLink })), {
    status: 200,
    headers: {
      'content-type': 'text/html',
    },
  })
})

// Static Assets
app.get('/static/*', req => serveDir(req))

export default {
  fetch(req) {
    return app.handler(req)
  },
} satisfies Deno.ServeDefaultExport
