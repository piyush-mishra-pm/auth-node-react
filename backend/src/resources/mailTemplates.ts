import { mailTransporter } from "../services/mailer";

export const defaultMailTemplate = async function (toEmail: string, subject: string = 'Auth-Node-React mail', html: string = 'Auth-Node-Reat Email Content', fromMail: string = 'admin@example.com') {
    await mailTransporter.sendMail({
        from: fromMail,
        to: toEmail,
        subject,
        html
    });
}

