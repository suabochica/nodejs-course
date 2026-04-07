import { invert } from "jsr:@std/collections"

const challenge = { a: "x", b: "y", c: "z" }
const result = invert(challenge)

console.log(result) // { x: "a", y: "b", z: "c" }