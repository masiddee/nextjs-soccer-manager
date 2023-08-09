'use strict';

import {
  Division,
  Prisma,
  PrismaClient,
  TeamFeeStatus,
  User,
} from '@prisma/client';
import {
  sampleAtlantaUnitedPlayers,
  sampleAustinFcPlayers,
} from './samplePlayers';

/**
 * NOTE: the foreign key IDs may need to be changed for your local Prisma instance
 */
const teamData: Omit<
  Prisma.TeamUncheckedCreateInput,
  'captainId' | 'createdById'
>[] = [
  {
    name: 'Atlanta United',
    feeStatus: 'PAID',
    division: 'D1',
    wins: 6,
    losses: 4,
    draws: 5,
  },
  {
    name: 'Austin FC',
    feeStatus: 'PAID',
    division: 'D1',
    wins: 4,
    losses: 6,
    draws: 4,
  },
  {
    name: 'Dallas FC',
    feeStatus: 'PAID',
    division: 'D1',
    wins: 4,
    losses: 6,
    draws: 4,
  },
  {
    name: 'Manchester United',
    feeStatus: 'PAID',
    division: 'D1',
    wins: 4,
    losses: 6,
    draws: 4,
  },
  {
    name: 'Manchester City',
    feeStatus: 'PAID',
    division: 'D1',
    wins: 4,
    losses: 6,
    draws: 4,
  },
  {
    name: 'Inter Milan',
    feeStatus: 'PAID',
    division: 'D1',
    wins: 4,
    losses: 6,
    draws: 4,
  },
  {
    name: 'Barcelona',
    feeStatus: 'PAID',
    division: 'D1',
    wins: 4,
    losses: 6,
    draws: 4,
  },
  {
    name: 'Real Madrid',
    feeStatus: 'PAID',
    division: 'D1',
    wins: 4,
    losses: 6,
    draws: 4,
  },
  {
    name: 'Inter Miami',
    feeStatus: 'PAID',
    division: 'D1',
    wins: 4,
    losses: 6,
    draws: 4,
  },
  {
    name: 'Seattle Sounders',
    feeStatus: 'PAID',
    division: 'D1',
    wins: 4,
    losses: 6,
    draws: 4,
  },
  {
    name: 'Cincinnati FC',
    feeStatus: 'PAID',
    division: 'D1',
    wins: 4,
    losses: 6,
    draws: 4,
  },
  {
    name: 'New York Redbulls',
    feeStatus: 'PAID',
    division: 'D1',
    wins: 4,
    losses: 6,
    draws: 4,
  },
];

type TeamDataFactoryArgs = {
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;
  captain: User;
  allPlayers?: User[];
  leagueId: string;
};
/**
 * NOTE: using prisma.createMany gave me a foreignKey error, so using map + prisma.create instead.
 */
export const teamDataFactory = async ({
  prisma,
  captain,
  allPlayers,
  leagueId,
}: TeamDataFactoryArgs) => {
  teamData.forEach(async _ => {
    const team = await prisma.team.create({
      data: {
        league: {
          connect: {
            id: leagueId,
          },
        },
        name: _.name,
        captain: {
          connect: {
            id: captain.id,
          },
        },
        feeStatus: _.feeStatus as TeamFeeStatus,
        division: _.division as Division,
        wins: _.wins,
        losses: _.losses,
        draws: _.draws,
        createdBy: {
          connect: {
            id: captain.id,
          },
        },
      },
    });

    // Add relation team <---> players
    switch (team.name) {
      case 'Atlanta United':
        sampleAtlantaUnitedPlayers.forEach(async p => {
          await prisma.user.update({
            data: {
              teams: {
                connect: {
                  id: team.id,
                },
              },
            },
            where: {
              email: p.email,
            },
          });
        });
        break;

      case 'Austin FC':
        sampleAustinFcPlayers.forEach(async p => {
          await prisma.user.update({
            data: {
              teams: {
                connect: {
                  id: team.id,
                },
              },
            },
            where: {
              email: p.email,
            },
          });
        });
        break;
    }
  });
};
