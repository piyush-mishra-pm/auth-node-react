import { createTransport } from 'nodemailer';

// Can optionally use Sendgrid here. Currently only using MailHog.
export const mailTransporter = createTransport({ host: '0.0.0.0', port: 1025 });

