# Section 05: Debugging Node.js

## Index

1. Intro: Debugging Node.js
2. Debugging Node.js
3. Error Messages


## 1. Intro: Debugging Node.js

What is worse than getting an error when you run your application? Not knowing how to fix it. The weapon to face this scenarios is the debugging.

Here we will learn how to effectively debug your Node.js apps, how to track down and fix issues so you can get back to the important work.

## 2. Debugging Node.js

Node comes with a great set of tools for getting to the bottom of any bug or programming issue.

### Console.log
While it's nice to have advanced debugging tools at the ready, there's nothing wrong with using `console.log` to debug your application. It's not the fancies technique, but it works, and I developers use it daily.

When in doubt, use few call to `console.log` to figure out what is going on. It is great for dumping a variable to the terminal so you can check its values. It alos works figuring out what order your code is running in.

