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
## 4. Environment Variables
## 5. Creating a Production MongoDB Database
## 6. Heroku Deployment
