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


### Node Debugger
Printing values to the console with `console.log` is a good start, but there are often times where we need a more complete debugging solution. For that, Node.js ships with a built-in debugger. It builds off of the developer tools that Chrome and V8 use when debuggin JavaScript code in the browser.
Start your application with `inspect` to use the debugger.

```
node inspect app.js
```

Next visit `chrome://inspect` in the Chrome browser. there you will see a list of all the Node.js processes that you are able to debug. Click "inspect" next to your Node.js process to open up the developer tools. From there, you can click the blue "play" button near the top-right of the "sources" tab to start up the application.

When running the app in debug mode, you can add breakpoints into your application to stop it at a specific point in the code. This gives you a chance to explore to the application state and figure out what is going wrong.

```js
console.log('Thing one');

debugger // Debug tools will pause here until your click play again

console.log('Thing two')
```

### Links
+ [Node.js debugger documentation](https://nodejs.org/api/debugger.html)
