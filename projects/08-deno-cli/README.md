# 🦕 Deno

Uncomplicate JavaScript. Deno is the open-source JavaScript runtime for the modern web.

## WTF is meta.main?

[import.meta](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import.meta) is not under deno. It is under the web platform and is an specific syntax that helps you to get information of a module. Let's check the next example.

```ts
// main.ts
export function helloWorld() {
  console.log('Main?', import.meta.main)
  return "Hi Mom!"
}

if (import.meta.main) {
  console.log(helloWorld());
}
```

Import the function in a different file:

```ts
// other.ts
import { helloWorld } from './main'
helloWorld()
```

If you run the main file, the value is logged in side `meta.main`

```sh
deno run main.ts
```

But if you run the lib file, it will NOT run the code inside `meta.main`

```sh
deno run lib.ts
```

## Modules

Modules are files that containing JavaScript code. You can create your own ES Modules, that nowadays are the standard after CommonJs.

Default export

```ts
export default function foo() {
    console.log('foo')
}
```

Named export
```ts
export function bar() {
    console.log('bar')
}
```

Import

```ts
import foo from "./a.ts";
import { bar } from "./b.ts";
```

Customizing the Import Names

```ts
import customFoo from "./a.ts";
import { bar as customBar } from "./b.ts";
```

[JSR](https://jsr.io) is the open-source package registry for modern JavaScript and TypeScript and the prefix `std` make a reference for the standard library.

```ts
import { toCamelCase } from "jsr:@std/text"

console.log(toCamelCase('Make me a camel'))
```

Challenge

```ts
const record = { a: "x", b: "y", c: "z" };
```

## Generate Documentation for TS Code

```
/**
 * Multiplies two numbers together.
 */
export function multiply(a: number, b: number) {
    return a * b;
}
```

```sh
deno doc --html --name="My library" lib.ts
```

## Permissions

Basic security

```sh
deno run --allow-read app.ts 
```

Allow all

```sh
deno run -A app.ts
```

Granular security

```sh
deno run --allow-read --deny-read=./diary.txt app.ts
```

## Tasks

Similar to the scripts of the `package.json` in npm, we can use the `task` property in the `deno.json`.

```json
{
  "tasks": {
    "dev": "deno run --watch main.ts", // Watch a task
    "build": "deno run npm:build", // Use an NPM script
    "all": "first ; second", // Run first and second, even if first task fails
    "sequential": "first && second", // Run only if first task succeeds
    "backup": "first || second", // Run only if first task fails
    "async": "first & second" // Run both concurrently
  },
}
```
## Clean Code

We can meet linter a format rules for code in the `deno.json` file with the `lint` and `fmt` properties.

```json
{
 "lint": {
    "include": ["src/"],
    "exclude": ["src/testdata/", "src/fixtures/**/*.ts"],
    "rules": {
      "tags": ["recommended"],
      "include": ["ban-untagged-todo"],
      "exclude": ["no-unused-vars"]
    }
  },
  "fmt": {
    "useTabs": true,
    "lineWidth": 80,
    "indentWidth": 4,
    "semiColons": true,
    "singleQuote": true,
    "proseWrap": "preserve",
    "include": ["src/"],
    "exclude": ["src/testdata/", "src/fixtures/**/*.ts"]
  }
}
```

## Bench

> ## Rob Pike's 5 Rules of Programming
> - **Rule 1**. You can't tell where a program is going to spend its time. Bottlenecks occur in surprising places, so don't try to second guess and put in a speed hack until you've proven that's where the bottleneck is.
> - **Rule 2 (bench)**. Measure. Don't tune for speed until you've measured, and even then don't unless one part of the code overwhelms the rest.
> - **Rule 3**. Fancy algorithms are slow when n is small, and n is usually small. Fancy algorithms have big constants. Until you know that n is frequently going to be big, don't get fancy. (Even if n does get big, use Rule 2 first.)
> - **Rule 4**. Fancy algorithms are buggier than simple ones, and they're much harder to implement. Use simple algorithms as well as simple data structures.
> - **Rule 5**. Data dominates. If you've chosen the right data structures and organized things well, the algorithms will almost always be self-evident. Data structures, not algorithms, are central to programming.

Now run the next command to check an exercise to determine what function has better performance making a sum of the elements in an array:

```sh
deno bench arr-sum.ts 
```

You will get the next output when the test array has a length `100000` :

```txt
Check arr-sum.ts
    CPU | AMD Ryzen 7 2700X Eight-Core Processor
Runtime | Deno 2.7.11 (x86_64-unknown-linux-gnu)

file:///home/suabochica/Development/nodejs-course/projects/08-deno-cli/arr-sum.ts

| benchmark          | time/iter (avg) |        iter/s |      (min … max)      |      p75 |      p99 |     p995 |
| ------------------ | --------------- | ------------- | --------------------- | -------- | -------- | -------- |
| Array forEach      |        854.9 µs |         1,170 | (615.8 µs …   1.3 ms) | 953.3 µs |   1.2 ms |   1.3 ms |
| Array reduce       |        899.4 µs |         1,112 | (829.8 µs …   1.4 ms) | 918.8 µs |   1.2 ms |   1.3 ms |
| Array for...of     |        441.7 µs |         2,264 | (431.7 µs … 846.4 µs) | 441.1 µs | 523.0 µs | 525.6 µs |
| Array for loop     |         87.4 µs |        11,440 | ( 74.1 µs … 572.9 µs) |  86.3 µs | 125.1 µs | 133.2 µs |
| Array while loop   |         89.2 µs |        11,220 | ( 74.6 µs … 239.6 µs) |  86.6 µs | 159.2 µs | 193.0 µs |

summary
  Array for loop
     1.02x faster than Array while loop
     5.05x faster than Array for...of
     9.78x faster than Array forEach
    10.29x faster than Array reduce
```

Here, the traditional loop has better performance, but the truth is that it does not matter what function you use _unless_ the array is big

The next example is to illustrate why Set is a bad alternative to find a value in a group of data:

```sh
deno bench arr-includes.ts 
```

You will get the next output:

```
Check arr-includes.ts
Lookup size: 1000
Sample of test data (first 5): [ "user_rs", "user_rt", "user_ru", "user_rv", "user_rw" ]
Sample of lookup values (first 5): [
  "miss-183",
  "user_i7x",
  "PROD-HZQM8M",
  "user10489@yahoo.com",
  "user_6i8"
]
    CPU | AMD Ryzen 7 2700X Eight-Core Processor
Runtime | Deno 2.7.11 (x86_64-unknown-linux-gnu)

file:///home/suabochica/Development/nodejs-course/projects/08-deno-cli/arr-includes.ts

| benchmark        | time/iter (avg) |        iter/s |      (min … max)      |      p75 |      p99 |     p995 |
| ---------------- | --------------- | ------------- | --------------------- | -------- | -------- | -------- |
| Array includes   |         69.7 ms |          14.3 | ( 68.8 ms …  73.0 ms) |  69.5 ms |  73.0 ms |  73.0 ms |
| Set lookup       |        264.0 ns |     3,788,000 | (251.5 ns … 488.9 ns) | 260.3 ns | 431.3 ns | 488.9 ns |
```

As you can se the Array `.includes` its much faster that the set look up. The reason its because in the Set case the program run over each element in the array. Similar to the indexes in a relational database.

The takeaway is, if you have a small array, set not worth it, but if you have a big array, set is your friend.

The last example is with sorting algorithms. Let's bid against the native `sort()` method of JavaScript. So please run.

```sh
deno bench arr-sort.ts 
```

The output it is:

```
Check arr-sort.ts
    CPU | AMD Ryzen 7 2700X Eight-Core Processor
Runtime | Deno 2.7.11 (x86_64-unknown-linux-gnu)

file:///home/suabochica/Development/nodejs-course/projects/08-deno-cli/arr-sort.ts

| benchmark     | time/iter (avg) |        iter/s |      (min … max)      |      p75 |      p99 |     p995 |
| ------------- | --------------- | ------------- | --------------------- | -------- | -------- | -------- |
| Bubble Sort   |        105.4 ms |           9.5 | (104.8 ms … 106.4 ms) | 105.7 ms | 106.4 ms | 106.4 ms |
| Quick Sort    |        612.7 µs |         1,632 | (589.3 µs …   3.9 ms) | 606.1 µs | 764.1 µs | 821.2 µs |
| Merge Sort    |          5.1 ms |         195.1 | (  4.8 ms …   5.7 ms) |   5.2 ms |   5.5 ms |   5.7 ms |
| JS sort       |          1.9 ms |         534.0 | (  1.8 ms …   2.2 ms) |   1.9 ms |   2.1 ms |   2.1 ms |

summary
  JS sort
     2.85x slower than Quick Sort
     2.75x faster than Merge Sort
    57.46x faster than Bubble Sort
```

As you can see the Quick Sort is almost 3x faster but keep in mind that this depends of the items in the array you are sorting.

## Testing

Run:

```sh
deno test main_test.ts 
```

The output is:

```txt
Check main_test.ts
running 4 tests from ./main_test.ts
multiplyTest ... ok (0ms)
multiply test ... ok (0ms)
mock API call ... ok (0ms)
database lib ...
  db exists ... ok (0ms)
  insert user ... ok (0ms)
database lib ... ok (0ms)

ok | 4 passed (2 steps) | 0 failed (10ms)
```

## CLI

Run

```sh
deno run cli.ts
```

You will get an interaction with your terminal, an according the answers you will get specific flows wit color styles. This little program is all done with the standard library where we use colors, get input from prompt and more.

## Foreign Function Interface (FFI)

Foreign Function Interface allows JavaScript and TypeScript code to call functions in dynamic libraries written in languages like C, C++, or Rust. This enables you to integrate native code performance and capabilities directly into your Deno applications.

The example we did use the `toUpperCase` function form a file in C. You can run:

```sh
deno run --allow-ffi cli.ts
```

## Compile

Run

```sh
deno compile --allow-ffi -o upper cli.ts
```

This will generate a upper file that it can use to run our cli program in a native binary of the OS we will be sing:

```sh
./upper --text "deno is cool" --kebab
```

The output:

```txt
How old are you? 21

ACCESS GRANTED

Wait, r u sure? [y/N] y

DENO IS COOL
deno-is-cool
```