const sgMail = require('@sendgrid/mail');

const sendgridAPIKey = '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';

sgMail.setApiKey(sendgridAPIKey);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'sergio.kun21@gmail.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how do you get along with the app`
    });
};

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'sergio.kun21@gmail.com',
        subject: 'Sorry to see you go!',
        text: `We are sad for you cancelation, ${name}. Let me know the reason of you left. Keep doing well!`
    });
};

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail,
};
