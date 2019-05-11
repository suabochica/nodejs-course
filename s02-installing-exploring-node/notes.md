# Installing node

To install node you have the next options:

1. Download the installer from www.nodejs.org
2. Use a package manager to install apps in your Operative System.

After run the installer you can check that node is installed running the next command:

    node --version

Now that node is installed you need an editor to develop with NodeJS. The recommended editor is [VSCode](https://code.visualstudio.com).

## What is NodeJS?

NodeJS is a runtime built with V8 JavaScript engine that allow us to run JavaScript code on the server side. This means that we can built web servers, command line interfaces and more.

## How NodeJS works?
The key to understand how NodeJS works is in the V8 JavaScript engine. This is the engine used by the Chrome browser and his work is compile JavaScript code into machine code. Let's deep in the context where the V8 engine have relevance.

The V8 engine is written in C++. This means that anyone can write a C++ application and incorporate the V8 JavaScript engine into the app. Sameway you could extend the functionality that JavaScript provide. This is exactly what Google Chrome and NodeJS do ,because both are written in C++.

An important concept is _runtime_. The runtime is a context that privides custom functionality for various tools and libraries specific to an environment. Then we can assure that Chrome has a runtime and Node JS has a different one.

The Chrome runtime provide V8 with several objects and functions that allow JavaScript developers in the Chrome browser to manipulate the DOM or handle events. Neither of those features makes sense for NodeJS, because in this context we don't have a DOM and we don't have events. Instead, the NodeJS runtime provides tools and libraries for JavaScript developers to setting up web servers integrating with the file system. To conclude, both, Chrome and NodeJS are just creating their own modified version of JavaScript.

In Summary, NodeJS is JavaScript in the server. This is possible because NodeJS uses the V8 JavaScript Engine to run all of the JavaScript code you provide. NodeJS is able to teach JavaScript new things by providing C++ bindings to V8. This allows JavaScript to do anything that C++ can do, like access to the file system.
