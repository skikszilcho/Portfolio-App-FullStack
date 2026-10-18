const nodemailer = require('nodemailer');
const {
  GMAIL_USER,
  GMAIL_APP_PASSWORD,
  CONTACT_RECIPIENT_EMAIL,
} = require('../config/env');

// Create a reusable transporter (singleton — created once at module load).
// Gmail SMTP with App Password authentication.
// Requires 2FA enabled on GMAIL_USER account.
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_APP_PASSWORD,
  },
});

/**
 * Sends a contact form submission to Ikageng's inbox.
 *
 * @param {{ fullName: string, email: string, mobileNumber: string, subject: string, message: string }} payload
 * @returns {Promise<void>}
 */
async function sendContactEmail(payload) {
  const { fullName, email, mobileNumber, subject, message } = payload;

  await transporter.sendMail({
    from:     `"Portfolio Contact" <${GMAIL_USER}>`,
    to:       CONTACT_RECIPIENT_EMAIL,
    replyTo:  email,
    subject:  `[Portfolio Contact] ${subject}`,
    text: [
      `Name:    ${fullName}`,
      `Email:   ${email}`,
      `Mobile:  ${mobileNumber}`,
      `Subject: ${subject}`,
      ``,
      `Message:`,
      message,
    ].join('\n'),
    html: `
      <table style="font-family: sans-serif; font-size: 15px; color: #1f2328;">
        <tr><td><strong>Name</strong></td><td>${fullName}</td></tr>
        <tr><td><strong>Email</strong></td><td><a href="mailto:${email}">${email}</a></td></tr>
        <tr><td><strong>Mobile</strong></td><td>${mobileNumber}</td></tr>
        <tr><td><strong>Subject</strong></td><td>${subject}</td></tr>
      </table>
      <hr />
      <p style="font-family: sans-serif; font-size: 15px; white-space: pre-wrap;">${message}</p>
    `,
  });
}

module.exports = { sendContactEmail };