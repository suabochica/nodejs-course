# Section 12: API Authentication and Security

## Index
1. Intro: Authentication and Security
2. Securely Storing Passwords with Bcrypt: Part I
3. Securely Storing Passwords with Bcrypt: Part II
4. Login Users
5. JSON Web Tokens
6. Generating Authentication Tokens
7. Express Middleware
8. Accepting Authentication Tokens
9. Advanced Postman
10. Login Out
11. Hiding Private Data
12. Authenticating User Endpoints
13. The User/Task Relationship
14. Authenticating Task Endpoints
15. Cascade Delete Tasks

## 1. Intro: Authentication and Security
In this section, you will set up authentication for the task manager app. This will require users to log in before they will be able to manage their tasks. This section also covers password security, Express middleware, advanced postman, and more.

## 2. Securely Storing Passwords with Bcrypt: Part I
Currently all our information is public and if you check the values of the password field, they are plain text the everyone can consume. So, we have to find a way to securely store users password before to storing it in the database. To achieve this goal, we will hashing and salting the value before to introduce it in the database.

### Hashing Passwords
Storing plain text passwords is a bad idea. Most folks reuse password for multiple accounts online. That means that if your database gets compromised, the hacker can reuse those credentials on the other sites such as credit cards or bank accounts. We don't want to leave our users open to further attacks.

The solution is has passwords using a secure one-way hashing algorithm. Users passwords will stay hidden and secure, even if the database is compromised.

### Hashing Passwords with Bcrypt
First up, install the library

```
npm i bcrypt@2.4.3
```

The `hash` method of bcrypt can be used to hash the plain text password. The example below hashes "Red12345!",

```js
const password = 'Red12345!'
const hashedPassword = await bcrypt.hash(password, 8)
// The hashed password is what would be stored in the database
```

The `compare` method is used to compare a plain text against a previously hashed password. This would be useful when logging in. The user logging in provides the plain text password for their account. The application fetches the hashed password from the database for that user. `compare` is the called to confirm it's a match.

```js
const isMatch - await bcrypt.compare('Red12345!', hashedPassword)
console.log(isMatch)
```

### Links
+ [npm](bcryptjs)

## 3. Securely Storing Passwords with Bcrypt: Part II
Time to use Mongoose middleware. Middleware will allow you to automatically hash a user's password before the user saved to the database.

### Mongoose Middleware
Middleware allows you to register some code to run before or after a lifecycle event for your model. As an example, you could use middleware to register some code to run just after a user is deleted. You could also use middleware to register some code to run just before the user is saved. This can be used to hash passwords just before saving users to the database.

This example below call `pre` with the 'save' lifecycle event. This registers a function to run just before users are saved. The function itself checks the password has been modified. If the password was altered, the plain text password is overwritten with a hashed version.

```js
userSchema.pre('save', async function (next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
});
```

### Links
+ [Mongoose Middleware](https://mongoosejs.com/docs/middleware.html)

## 4. Login Users
Logging in a user is a two-step process. The user provides their email and password, and the first thing to do is fetch the user by their email. From there, bcrypt is used to verify the password provided matches the hashed password stored in the database. If either step fails, the users won't be able to log in. If both steps succeed, then you know the user is who they say they are.

The code below sets up `findByCredentials` which finds a user by their email and password.

```js
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Unable to login');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Unable to login');
    }

    return user;
};
```

You can then call `findByCredentials` from you application when users nee to login. The example below shows how this can be done.

```js
const user = await User.findByCredentials(request.body.email, request.body.password);
```

## 5. JSON Web Tokens
JWT a.k.a JSON Web Tokens is provide a nice system for issuing and validating authentication tokens. The authentication token will ensure that the client does not need to log in every time the want to perform an operation on the server.

### JSON Web Tokens
First up, install the library.

```
npm i jsonwebtoken@8.5.1
```

The `sign` method can be used to generate a new token. `sign` accepts three arguments:

1. The data embed in the token: For this case it needs to include a unique identifier for the user.
2. Secret phrase: This is used to issue and validate tokens, ensuring that the token data has not beem tampered with.
3. Set of option in an object: The example below use `expiresIn` to create a token that is valid for seven days.

```js
const jwt = require('jsonwebtoken')

const token = jwt.sign({ _id: 'abc123' }, 'thisismycourse', { 'expiresIn': '7 days' });
```

Tokens can be issued to users when they sign up or log in to the application. These can then be stored on the data and used to authenticate the user when they perform other options.

The server can verify the token using `verify`. This requires two arguments:

1. The token to validate.
2. The secret phrase that the token was created wiht. If valid, the embedded data will be returned. This would allow the server to figure out which user is performing the operation.

```js
const data = jwt.verify(token, 'thisismynewcourse')
// data._id contains the user id of the user that owns this token
```

## 6. Generating Authentication Tokens
## 7. Express Middleware
## 8. Accepting Authentication Tokens
## 9. Advanced Postman
## 10. Login Out
## 11. Hiding Private Data
## 12. Authenticating User Endpoints
## 13. The User/Task Relationship
## 14. Authenticating Task Endpoints
## 15. Cascade Delete Tasks
