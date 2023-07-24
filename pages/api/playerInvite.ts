import type {NextApiRequest, NextApiResponse} from 'next';
import {sendEmail} from '../../services/email';
import {GetEmailBody} from '../../services/emailTemplateService';

export type PlayerInviteData = {
  name: string;
  captainName: string;
  leagueName: string;
  inviteLink: string;
  email: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).send({message: 'Only post request allowed'});
  }
  try {
    const {name, captainName, leagueName, inviteLink, email} = req.body;

    const bodyData = {
      email,
      name,
      captainName,
      leagueName,
      inviteLink,
    };

    const subjectData = {
      captainName,
      leagueName,
    };

    const emailBody = await GetEmailBody('invites/invite_body.txt', bodyData);
    const emailSubject = await GetEmailBody(
      'invites/invite_subject.txt',
      subjectData,
    );

    const emailParam = {
      to: email,
      from: process.env.ADMIN_EMAIL as string,
      subject: emailSubject,
      text: emailBody,
    };

    sendEmail(emailParam);

    return res.status(200).json({
      message: 'Contact Email Sent Successfully',
      playerInfo: {name, email},
    });
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : 'Internal server error';
    res.status(500).json({message: errorMessage});
  }
}
