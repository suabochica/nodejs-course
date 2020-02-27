# Section 15: Sending Emails

## 1. Intro: Sending Emails
Time to add email sending to your Node.js application! This will allow you to communicate with user as they uses the app. This could be useful for welcome emails, notifications, and more.

## 2. Exploring SendGrid
Let's integrate SendGrid in your Node app. SendGrid is one of many services that allow you to send emails from your application code.

First up, install the module:

```
npm i sendgrid/mail@6.3.1
```

Next, create a free SendGrid account and get your API key. Following the respective instructions. The code below shows what is necessary to get the SendGrid module configured. All you need to do is call `setApiKey` to you API key.

```js
const sgMail = require('@sendgrid/mail')

sgMail.setApiKey('#')
```

`send` can be called to send an email from your application. The configuration object can be used to provide:

+ `to`- Who is the email to?
+ `from`- Who is the email from?
+ `subject`- Who is the subject line of the email?
+ `text`- Who is the body of the email?

```js
sgMail.send({
    to: 'sergio.kun@gmail.com',
    from: 'sergio.kun@gmail.com',
    subject: 'This is my first creation!',
    text: 'I hope this one actually get to you.',
})
```

In the long term, you will want to purchase a custom domain and register it with SendGrid. This will increase your sending reliability.

### Links
+ [SendGrid](https://sendgrid.com/)


## 3. Sending Welcome Cancelation Emails
Now let's use the code that we consolidate to integrate the SendGrid mail library and then we will send emails when a new user is created and when a user cancelates his account. To achieve this goal, lets exports some functions from our `accounts.js` file and consume them in the `routers/users.js`.

So for send a welcome email we will expose a function as shows the next snippet:

```js
const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'sergio.kun21@gmail.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how do you get along with the app`
    });
};

module.exports = {
    sendWelcomeEmail,
};
```
Then we consume this function in our `POST` request to create an user:

```js
const { sendWelcomeEmail } = require('../emails/account');

router.post('/users', async (request, response) => {
    const user = new User(request.body);

    try {
        await user.save();
        sendWelcomeEmail(user.email, user.name);
        const token = await user.generateAuthToken();

        response.status(201).send({ user, token });
    } catch (error) {
        response.status(400).send(error);
    }
});
```

## 4. Environment Variables
Let's learn how to use environment variables to securely store API keys and other credentials. This will reduce the chance your private keys fail into the wrong hands.

First up lets install the `env-cmd` module.

```
npm i env-cmd@10.1.0 --save-dev
```

Next up, create an environment file `dev.env` in the `config` directory. This will store your environment variables in the following format.

```
KEY=value
ANOTHER_KEY=someothervalue
```

Next, update the `dev` script to use env-cmd to load thos environment variables when it starts up. That woudl be `env-cmd ./config/dev.env nodemon src/index.js`

Now, you can remove API keys and database credentials from the application itself. For example, you can create `MONGODB_URL` in the development environment file. the applicatio code shown below can then reference that environment variable to get its value. This can be done with the SendGrid API key and the JWT secret used to generate and verigy authentication tokens.

```js
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})
```
### Links
+ [npm: env-cmd](https://www.npmjs.com/package/env-cmd)

## 5. Creating a Production MongoDB Database
To create a production MongoDB database we will use the MongoDB Atlas platform that is a cloud-hosted service on AWS to deploy, operate and scale a MongoDB database in just few clicks.

This section brings different setups according two environments: Production and Development.

For production we will use the MongoDB Atlas service so in summary this are the steps that we have to execute:

1. Create an account for MongoDB Atlas
2. Choose the free plan to create one cluster
3. Follow the configuration steps
  + Create a manual IP: 0.0.0.0/0
  + Set a username and a password
4. Download the Compass Database Client (a replace to Robo3T)
  + Connect the local database
  + Connect the atlas/prod database 

### Links
+ [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/lp/general/try?utm_source=google&utm_campaign=gs_americas_colombia_search_brand_atlas_desktop&utm_term=atlas%20mongo&utm_medium=cpc_paid_search&utm_ad=e&gclid=EAIaIQobChMIjZLM6a_y5wIVgpOzCh2cygLwEAAYASAAEgIEDfD_BwE)

+ [MongoDB Compass](https://www.mongodb.com/products/compass)

## 6. Heroku Deployment
