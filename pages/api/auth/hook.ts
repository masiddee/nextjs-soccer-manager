import prisma from '../../../lib/prisma';
import {Prisma} from '@prisma/client';
import type {NextApiRequest, NextApiResponse} from 'next';
import {UserData} from 'auth0';

type RequestBodyAuth0User = UserData & {secret: string};

const loginHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {email, secret, given_name, family_name, user_id} =
    req.body as RequestBodyAuth0User;

  if (req.method !== 'POST') {
    return res.status(403).json({message: 'Method not allowed'});
  }

  if (secret !== process.env.AUTH0_HOOK_SECRET) {
    return res.status(403).json({message: `You must provide the secret 🤫`});
  }

  if (email) {
    /** Using 'upsert' instead of 'create' to handle invited players that may exist in Prisma but not Auth0 just yet */
    await prisma.user.upsert({
      where: {
        email,
      },
      update: {
        externalUserId: user_id,
        firstName: given_name,
        lastName: family_name,
      } as Prisma.UserCreateInput,
      create: {
        email,
        externalUserId: user_id,
        firstName: given_name,
        lastName: family_name,
      } as Prisma.UserCreateInput,
    });
    return res.status(200).json({
      message: `User with email: ${email} has been created successfully!`,
    });
  }
};

export default loginHandler;
