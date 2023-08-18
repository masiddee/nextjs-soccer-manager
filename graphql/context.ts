import {getSession} from '@auth0/nextjs-auth0';
import type {NextApiRequest, NextApiResponse} from 'next';
import prisma from '../lib/prisma';

export async function createContext({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) {
  const session = await getSession(req, res);

  if (!session || typeof session === 'undefined') return {};

  // console.log('SESSION', {session});

  const {user, accessToken} = session;
  const prismaUser = await prisma.user.findFirst({
    where: {externalUserId: user.sub},
  });

  // console.log('USER', {prismaUser});
  return {
    user: prismaUser,
    accessToken,
  };
}
