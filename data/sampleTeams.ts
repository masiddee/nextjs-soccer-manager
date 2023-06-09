'use strict';

import {Division, Prisma, PrismaClient, TeamFeeStatus} from '@prisma/client';

/**
 * NOTE: the foreign key IDs may need to be changed for your local Prisma instance
 */
const teamData = [
  {
    // id: 1,
    leagueId: 1,
    name: 'Atlanta United',
    captainId: 72,
    feeStatus: 'PAID',
    division: 'D1',
    wins: 6,
    losses: 4,
    draws: 5,
    createdById: 72,
  },
  {
    // id: 2,
    leagueId: 1,
    name: 'Austin FC',
    captainId: 84,
    feeStatus: 'PAID',
    division: 'D1',
    wins: 4,
    losses: 6,
    draws: 4,
    createdById: 72,
  },
  {
    // id: 3,
    leagueId: 1,
    name: 'Dallas FC',
    captainId: 85,
    feeStatus: 'PAID',
    division: 'D1',
    wins: 4,
    losses: 6,
    draws: 4,
    createdById: 72,
  },
  {
    // id: 4,
    leagueId: 1,
    name: 'Manchester United',
    captainId: 86,
    feeStatus: 'PAID',
    division: 'D1',
    wins: 4,
    losses: 6,
    draws: 4,
    createdById: 72,
  },
  {
    // id: 5,
    leagueId: 1,
    name: 'Manchester City',
    captainId: 76,
    feeStatus: 'PAID',
    division: 'D1',
    wins: 4,
    losses: 6,
    draws: 4,
    createdById: 72,
  },
  {
    // id: 6,
    leagueId: 1,
    name: 'Inter Milan',
    captainId: 77,
    feeStatus: 'PAID',
    division: 'D1',
    wins: 4,
    losses: 6,
    draws: 4,
    createdById: 72,
  },
  {
    // id: 7,
    leagueId: 1,
    name: 'Barcelona',
    captainId: 78,
    feeStatus: 'PAID',
    division: 'D1',
    wins: 4,
    losses: 6,
    draws: 4,
    createdById: 72,
  },
  {
    // id: 8,
    leagueId: 1,
    name: 'Real Madrid',
    captainId: 79,
    feeStatus: 'PAID',
    division: 'D1',
    wins: 4,
    losses: 6,
    draws: 4,
    createdById: 72,
  },
  {
    // id: 9,
    leagueId: 1,
    name: 'Inter Miami',
    captainId: 80,
    feeStatus: 'PAID',
    division: 'D1',
    wins: 4,
    losses: 6,
    draws: 4,
    createdById: 72,
  },
  {
    // id: 10,
    leagueId: 1,
    name: 'Seattle Sounders',
    captainId: 81,
    feeStatus: 'PAID',
    division: 'D1',
    wins: 4,
    losses: 6,
    draws: 4,
    createdById: 72,
  },
  {
    // id: 11,
    leagueId: 1,
    name: 'Cincinnati FC',
    captainId: 82,
    feeStatus: 'PAID',
    division: 'D1',
    wins: 4,
    losses: 6,
    draws: 4,
    createdById: 72,
  },
  {
    // id: 12,
    leagueId: 1,
    name: 'New York Redbulls',
    captainId: 83,
    feeStatus: 'PAID',
    division: 'D1',
    wins: 4,
    losses: 6,
    draws: 4,
    createdById: 72,
  },
];

/**
 * NOTE: using prisma.createMany gave me a foreignKey error, so using map + prisma.create instead.
 */
export const teamDataFactory = (
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >,
) =>
  teamData.map(_ => {
    return prisma.team.create({
      data: {
        league: {
          connect: {
            id: _.leagueId,
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
  });
