import nodemailer from 'nodemailer';


export async function SendEmail(to,subject,html){
const transporter = nodemailer.createTransport({
  service:'gmail',
  auth: {
    user: process.env.NODE_MAILER_EMAIL,
    pass: process.env.NODE_MAILER_PASS,
  },
});

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `"Exoteryx Email Confirmation System" <${process.env.NODE_MAILER_EMAIL}>`, // sender address
    to, // list of receivers
    subject, // Subject line
    html, // html body
  });
}
