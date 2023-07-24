import sendgrid from '@sendgrid/mail';

sendgrid.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY as string);

type SendEmailParams = {
  subject: string;
  text: string;
  to: string;
  from: string;
};

export const sendEmail = async (params: SendEmailParams) => {
  const {subject, text, to, from} = params;

  try {
    console.log({subject, text, to, from});
    // await sendgrid.send({
    //   to,
    //   from,
    //   subject,
    //   text,
    // });
  } catch (error) {
    console.log('Email could not be sent.', {error});
    throw new Error('Email could not be sent, Please try again later');
  }
};
