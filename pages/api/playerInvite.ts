import type {NextApiRequest, NextApiResponse} from 'next';
import {sendEmail} from '../../services/email';
import {GetEmailBody} from '../../services/emailTemplateService';
import prisma from '../../lib/prisma';
import {Prisma} from '@prisma/client';

export type PlayerInviteData = {
  firstName: string;
  lastName: string;
  captainName: string;
  leagueName: string;
  inviteLink: string;
  email: string;
  teamId: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).send({message: 'Only post request allowed'});
  }
  try {
    const {
      firstName,
      lastName,
      captainName,
      leagueName,
      inviteLink,
      email,
      teamId,
    } = req.body;
    const tempExternalUserId = `${email}-${teamId}-INVITED`; /** This is generated for newly invited users, and should be replaced with Auth0 sub ID on initial signup */
    const bodyData = {
      email,
      firstName,
      lastName,
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

    await sendEmail(emailParam);

    try {
      const rosterPlayer = await prisma.user.create({
        data: {
          email,
          firstName,
          lastName,
          status: 'INVITED',
          externalUserId: tempExternalUserId,
          teams: {
            connect: {id: teamId},
          },
        } as Prisma.UserCreateInput,
      });

      return res.status(200).json({
        message: 'Contact Email Sent Successfully',
        rosterPlayer,
      });
    } catch (err) {
      let errorMessage;
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          errorMessage =
            'There is a unique constraint violation, a new user cannot be created with this email';
        } else {
          errorMessage = err.message;
        }
      } else {
        errorMessage = 'Unknown Prisma error';
      }

      res.status(500).json({message: errorMessage});
    }
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : 'Internal server error';

    console.log({err});
    res.status(500).json({message: errorMessage});
  }
}
