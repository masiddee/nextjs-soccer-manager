'use strict';

import {Division, Prisma, PrismaClient, TeamFeeStatus} from '@prisma/client';
import {
  sampleAtlantaUnitedPlayers,
  sampleAustinFcPlayers,
} from './samplePlayers';

/**
 * NOTE: the foreign key IDs may need to be changed for your local Prisma instance
 */
const teamData: Prisma.TeamUncheckedCreateInput[] = [
  {
    id: 1,
    leagueId: 1,
    name: 'Atlanta United',
    captainId: 1,
    feeStatus: 'PAID',
    division: 'D1',
    wins: 6,
    losses: 4,
    draws: 5,
    createdById: 1,
  },
  {
    id: 2,
    leagueId: 1,
    name: 'Austin FC',
    captainId: 2,
    feeStatus: 'PAID',
    division: 'D1',
    wins: 4,
    losses: 6,
    draws: 4,
    createdById: 1,
  },
  {
    id: 3,
    leagueId: 1,
    name: 'Dallas FC',
    captainId: 3,
    feeStatus: 'PAID',
    division: 'D1',
    wins: 4,
    losses: 6,
    draws: 4,
    createdById: 1,
  },
  {
    id: 4,
    leagueId: 1,
    name: 'Manchester United',
    captainId: 4,
    feeStatus: 'PAID',
    division: 'D1',
    wins: 4,
    losses: 6,
    draws: 4,
    createdById: 1,
  },
  {
    id: 5,
    leagueId: 1,
    name: 'Manchester City',
    captainId: 5,
    feeStatus: 'PAID',
    division: 'D1',
    wins: 4,
    losses: 6,
    draws: 4,
    createdById: 1,
  },
  {
    id: 6,
    leagueId: 1,
    name: 'Inter Milan',
    captainId: 6,
    feeStatus: 'PAID',
    division: 'D1',
    wins: 4,
    losses: 6,
    draws: 4,
    createdById: 1,
  },
  {
    id: 7,
    leagueId: 1,
    name: 'Barcelona',
    captainId: 7,
    feeStatus: 'PAID',
    division: 'D1',
    wins: 4,
    losses: 6,
    draws: 4,
    createdById: 1,
  },
  {
    id: 8,
    leagueId: 1,
    name: 'Real Madrid',
    captainId: 8,
    feeStatus: 'PAID',
    division: 'D1',
    wins: 4,
    losses: 6,
    draws: 4,
    createdById: 1,
  },
  {
    id: 9,
    leagueId: 1,
    name: 'Inter Miami',
    captainId: 9,
    feeStatus: 'PAID',
    division: 'D1',
    wins: 4,
    losses: 6,
    draws: 4,
    createdById: 1,
  },
  {
    id: 10,
    leagueId: 1,
    name: 'Seattle Sounders',
    captainId: 10,
    feeStatus: 'PAID',
    division: 'D1',
    wins: 4,
    losses: 6,
    draws: 4,
    createdById: 1,
  },
  {
    id: 11,
    leagueId: 1,
    name: 'Cincinnati FC',
    captainId: 11,
    feeStatus: 'PAID',
    division: 'D1',
    wins: 4,
    losses: 6,
    draws: 4,
    createdById: 1,
  },
  {
    id: 12,
    leagueId: 1,
    name: 'New York Redbulls',
    captainId: 12,
    feeStatus: 'PAID',
    division: 'D1',
    wins: 4,
    losses: 6,
    draws: 4,
    createdById: 1,
  },
];

/**
 * NOTE: using prisma.createMany gave me a foreignKey error, so using map + prisma.create instead.
 */
export const teamDataFactory = async (
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >,
) => {
  teamData.forEach(async _ => {
    const team = await prisma.team.create({
      data: {
        league: {
          connect: {
            id: Number(_.leagueId),
          },
        },
        name: _.name,
        captain: {
          connect: {
            id: _.captainId,
          },
        },
        feeStatus: _.feeStatus as TeamFeeStatus,
        division: _.division as Division,
        wins: _.wins,
        losses: _.losses,
        draws: _.draws,
        createdBy: {
          connect: {
            id: _.createdById,
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
              id: Number(p.externalUserId),
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
              id: Number(p.externalUserId),
            },
          });
        });
        break;
    }
  });
};
