
import { encodeBase64Url } from "jsr:@std/encoding";
import { crypto } from "jsr:@std/crypto/crypto";

export type ShortLink = {
  shortCode: string;
  longUrl: string;
  createdAt: number
  userId: string;
  clickCount: number;
  lastClickEvent?: string
}

export type GitHubUser = {
    login: string; // username
    avatar_url: string;
    html_url: string;
};

export async function storeUser(sessionId: string, userData: GitHubUser) {
    const key = ["sessions", sessionId];
    const res = await kv.set(key, userData);
    return res;
}

export async function getUser(sessionId: string) {
    const key = ["sessions", sessionId];
    const res = await kv.get<GitHubUser>(key);
    return res.value;
}

export async function generateShortCode(longUrl: string) {
  try {
    new URL(longUrl);
  } catch (error) {
    console.log(error);
    throw new Error("Invalid URL provided");
  }

  // Generate a unique identifier for the URL
  const urlData = new TextEncoder().encode(longUrl + Date.now());
  const hash = await crypto.subtle.digest("SHA-256", urlData);

  // Take the first 8 of the hash for the short URL
  const shortCode = encodeBase64Url(hash.slice(0, 8));

  return shortCode;
}

const kv = await Deno.openKv();

export async function storeShortLink(
  longUrl: string,
  shortCode: string,
  userId: string,
) {
  const shortLinkKey = ["shortlinks", shortCode];
  const data: ShortLink = {
    shortCode,
    longUrl,
    createdAt: Date.now(),
    userId,
    clickCount: 0,
  };

  const res = await kv.set(shortLinkKey, data);

  if (!res.ok) {
    // Handle error, e.g., log it or throw an exception
    throw new Error(`Failed to store short link;`)
  }

  return res
}

export async function getShortLink(shortCode: string) {
  const link = await kv.get<ShortLink>(["shortlinks", shortCode]);

  return link.value
}

export async function getUserLinks(userId: string) {
  const list = kv.list<string>({ prefix: [userId] });
  const res = await Array.fromAsync(list);
  const userShortLinkKeys = res.map((v) => ["shortlinks", v.value]);

  const userRes = await kv.getMany<ShortLink[]>(userShortLinkKeys);
  const userShortLinks = await Array.fromAsync(userRes);

  return userShortLinks.map((v) => v.value);
}

// Temporary example
// deno run -A --unstable-kv src/db.ts

const longUrl = "https://fireship.io";
const shortCode = await generateShortCode(longUrl)
const userId = "test-user";

console.log(shortCode)

await storeShortLink(longUrl, shortCode, userId);

const linkData = await getShortLink(shortCode);

console.log(linkData)