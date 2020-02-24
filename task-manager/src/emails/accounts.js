const sgMail = require('@sendgrid/mail');

const sendgridAPIKey = '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';

sgMail.setApiKey(sendgridAPIKey);
sgMail.send({
    to: 'sergio.kun21@gmail.com',
    from: 'sergio.kun21@gmail.com',
    subject: 'This is my first creation',
    text: 'I home this one actually get to you'
});
