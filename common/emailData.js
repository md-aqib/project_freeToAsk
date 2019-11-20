// predefined text
let contact = `If you have any questions, just call to us on 8840624226 — we're always happy to help you out.`;
let sign = `Regards,Team Aqib`;

exports.welcomeEmail = (name) => {
    return {
        heading: `Welcome!`,
        greeting: `Hi ${name},`,
        body: `Thank you for choosing Us.
        Your account is all set and is ready for use. Please login with the registered credentials.
        We are always there to help you.`,
        contact: contact,
        sign: `${sign}`
    };
};