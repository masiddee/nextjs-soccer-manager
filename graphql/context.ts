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

  const {user, accessToken} = session;
  const prismaUser = await prisma.user.findFirst({
    where: {externalUserId: user.id},
  });

  return {
    user: prismaUser,
    accessToken,
  };
}
