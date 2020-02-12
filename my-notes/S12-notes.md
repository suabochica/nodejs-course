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
Time to integrate JWT into the application. This will allow the app to issue to issue an authentication token when a user signs up or logs in.

### Generating and Storing Auth Tokens
Authentication tokens for a user can be stored in the datanbase. This provides a way for users to log out. All generated authentication tokens will be stored as part of the user profile. If a user logs out, the token will be removed from the user profile. A token would only be considered valid if it's valid JWT an it's still stored as part of the user profile. A user could be logged out of all session by simply deleting all the tokens stored in their user profile.

The snippet below adds a `tokens` array onto the user model. This will be used to store all valid authentication tokens for a user.

```js
const userSchema = new mongoose.Schema({
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
})
```
The instance method below is responsible for generating a new authentication tokens. The token is created, stored in the database, and finally returned from the function.

```js
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign( { _id: user._id.toString() }, 'thisismycourse');

    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
};
```

`generateAuthToken` can then be called to generate a fresh authentication token when users sign up or log in.

## 7. Express Middleware
When working with middleware, you will have more control over how your server processes requests. This will be used to check that a user is authenticated before performing specific operations.

### Exploring Express Middleware
Express middleware is nothing more than a function that runs as Express handles a given request. You can customize the function to do whatever you want it to do, and you can have it run whenever you wan it to.

The example below uses middleware to print information about incoming request. Middleware functions should accept three parameters: `req`, `res` and `next`. The only new parameter is `next`. `next` is called to signal to Express that the middleware function is done.

```js
const loggerMiddleware = (req, res, next) => {
    console.log('New request to: ' + req.method + ' ' + req.path)
    next
}

// Register the function as middleware for the application
app.use(loggerMiddleware)
```

### Links
+ [Express Middleware](http://expressjs.com/th/guide/using-middleware.html)

## 8. Accepting Authentication Tokens
Let's use Express middleware to put specific routes behind authentication. That will require the client to be authenticated before the operation can be performed.

### Accepting and Validating Tokens

The goal of the authentication middleware is to validate the authentication token and then fetch the profile for that user. `auth` below shows how you can get this done. Notice that the user profile is added into `req.user` This allows route handler functions to access the user profile without needing to fetch it again.

```js
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (request, response, next) => {
    try {
        const token = request.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, 'thisismycourse');
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

        if (!user) {
            throw new Error();
        }

        request.user = user;
        next();
    } catch (error) {
        return response.status(401).send({ error: 'Please authenticate'});
    }
};

module.exports = auth;
```

The authentication middleware can be added to individual endpoints to lock them down. This is shown with `GET /users/me` below. `autd` is added as the second argument to `router.get` meaning that it will run before the route handler function runs. This will ensure the user is authenticated.

```js
router.get('users/me', auth, async (request, response) => {
    response.send(request.user)
});
```

## 9. Advanced Postman
Let's go deep exploring environments with Postman. Environments make it easy to manage your request and authentication without having to manually add authentication tokens to the individual request.

To do a basic set up of an environments in Postman you can follow the next steps:

1. In the superior left corner you will see a gear icon next to a drop down with a "No environments" label.
2. Click on the gear and add an environment name like "Task Manager API (dev)"
3. There you will have an space to set a configuration of key/value pairs that you can consume in your collection. For example we can set a key `url` with the `localhost:3000` value and consume it form our request changing the address by `{{url}}/users`.

Now we will do a more complex set up to handle the Authorization header. As you can see in the Request View, we have a **Authorization** tab. There you can set the header choosing the respective authorization method (in this case Bearer Token), and then pass the value of the token that we store in the database.

Additionally, you can execute a java script code after execute a request. If you check the Request View, you will see a **Test** tab. There you can set an script to dynamically define the values of some key of the environment. The next code will set the value of the `authToken` key from the response of the request:

```js
if (pm.response.code === 201) {
    pm.environment.set('authToken', pm.response.jsong().token);
}
```

 `pm` is a global object that enables postman to access to some properties of the request.

## 10. Login Out
Currently we give a way to our users to log in, but we don't defined something to log out. To achieve that we will crate a new endpoint at `/users/logout` and we will set a logic to do validation over the tokens that we attached to our users. The next snippet illustrate this goal.

```js
router.post('/users/logout', auth, async (request, response) => {
    try {
        request.user.tokens = request.users.tokens.filter((token) => {
            return token.token !== request.token;
        });

        await request.user.save();

        response.send();
    } catch (error) {
        response.status(500).send(error);
    }
});
```

Notice that we always work with the user property that comes with the `request` object. Now let's try to accomplish the challenge of logout all the users following the next steps:

1. Set up POST `/users/logoutAll`
2. Create the router handler to wipe the tokens array
    - Send 200 or 500
3. Test your work checking the updates in the documents of your database.

The next snippet is the solution for this behavior:

```js
router.post('/users/logoutAll', auth, async (request, response) => {
    try {
        request.user.tokens = [];
        await request.user.save();

        response.send();
    } catch (error) {
        response.status(500).send(error);
    }
});
```

## 11. Hiding Private Data
It is necessary to limit what data gets sent to the client. This will allow you to hide authentication tokens and hashed passwords from server responses.

### Hiding Private Data
When a Mongoose document is passed to `res.send`, Mongoose converts the object into JSON. You can customize this by adding `toJSON` as a method on the object. The method below remove the `password` and `tokens` properties before sending the response back.

```js
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens

    return userObject 
}
```

## 12. Authenticating User Endpoints
## 13. The User/Task Relationship
## 14. Authenticating Task Endpoints
## 15. Cascade Delete Tasks
