import { expect } from "jsr:@std/expect";
import { assertEquals, assertNotMatch, assertExists, assertMatch, assertGreater } from "@std/assert";

import { multiply } from "./lib.ts";


// Basic Assertions
Deno.test(function multiplyTest() {
    assertEquals(multiply(2, 2), 4);
    assertEquals(multiply(2, 3), 6);
});

// Jest-style expect
Deno.test("multiply test", () => {
    expect(multiply(2, 3)).toBe(6);
});

// Async Test
Deno.test("mock API call", async () => {
    const mockApi = () => Promise.resolve("mock data");
    const result = await mockApi();
    assertEquals(result, "mock data");
});

// Multi-step Test
Deno.test("database lib", async (t) => {
    // Setup Logic
    const db = new Map()

    await t.step("db exists", () => {
        assertExists(db)
    });

    await t.step("insert user", () => {
        db.set('user', 'jeff');

        assertGreater(db.size, 0)
        assertMatch(db.get('user'), /jeff/)
        assertNotMatch(db.get('user'), /Bob/)

    });

});
