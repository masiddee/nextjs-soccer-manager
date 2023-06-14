'use strict';

import {FieldNumbers, GameResult, Prisma, PrismaClient} from '@prisma/client';

/**
 * NOTE: the foreign key IDs may need to be changed for your local Prisma instance
 */
const gameData = [
  {
    // id: 1,
    homeTeamId: 1,
    awayTeamId: 2,
    homeTeamScore: 4,
    awayTeamScore: 0,
    field: 'FIELD_1',
    gameDateTime: new Date(1685296800000), // May 28, 2023, 2pm ET
    gameResult: 'AWAY_WIN',
    isForfeit: null,
    leagueId: 1,
    createdById: 1,
  },
  {
    // id: 2,
    homeTeamId: 3,
    awayTeamId: 4,
    homeTeamScore: 0,
    awayTeamScore: 1,
    field: 'FIELD_2',
    gameDateTime: new Date(1685296800000), // May 28, 2023, 2pm ET
    gameResult: 'AWAY_WIN',
    isForfeit: null,
    leagueId: 1,
    createdById: 1,
  },
  {
    // id: 3,
    homeTeamId: 5,
    awayTeamId: 6,
    homeTeamScore: 2,
    awayTeamScore: 1,
    field: 'FIELD_3',
    gameDateTime: new Date(1685296800000), // May 28, 2023, 2pm ET
    gameResult: 'HOME_WIN',
    isForfeit: null,
    leagueId: 1,
    createdById: 1,
  },
  {
    // id: 4,
    homeTeamId: 1,
    awayTeamId: 2,
    homeTeamScore: 1,
    awayTeamScore: 1,
    field: 'FIELD_1',
    gameDateTime: new Date(1685300400000), // May 28, 2023, 3pm ET
    gameResult: 'TIE',
    isForfeit: null,
    leagueId: 1,
    createdById: 1,
  },
  {
    // id: 5,
    homeTeamId: 3,
    awayTeamId: 4,
    homeTeamScore: 0,
    awayTeamScore: 0,
    field: 'FIELD_2',
    gameDateTime: new Date(1685300400000), // May 28, 2023, 3pm ET
    gameResult: 'TIE',
    isForfeit: null,
    leagueId: 1,
    createdById: 1,
  },
  {
    // id: 6,
    homeTeamId: 5,
    awayTeamId: 6,
    homeTeamScore: 2,
    awayTeamScore: 3,
    field: 'FIELD_3',
    gameDateTime: new Date(1685300400000), // May 28, 2023, 3pm ET
    gameResult: 'AWAY_WIN',
    isForfeit: null,
    leagueId: 1,
    createdById: 1,
  },
  {
    // id: 7,
    homeTeamId: 7,
    awayTeamId: 8,
    homeTeamScore: 2,
    awayTeamScore: 5,
    field: 'FIELD_1',
    gameDateTime: new Date(1685901600000), // June 4, 2023, 2pm ET
    gameResult: 'AWAY_WIN',
    isForfeit: null,
    leagueId: 1,
    createdById: 1,
  },
  {
    // id: 8,
    homeTeamId: 2,
    awayTeamId: 4,
    homeTeamScore: 0,
    awayTeamScore: 0,
    field: 'FIELD_2',
    gameDateTime: new Date(1685901600000), // June 4, 2023, 2pm ET
    gameResult: 'TIE',
    isForfeit: null,
    leagueId: 1,
    createdById: 1,
  },
  {
    // id: 9,
    homeTeamId: 1,
    awayTeamId: 3,
    homeTeamScore: 2,
    awayTeamScore: 0,
    field: 'FIELD_3',
    gameDateTime: new Date(1685901600000), // June 4, 2023, 2pm ET
    gameResult: 'HOME_WIN',
    isForfeit: null,
    leagueId: 1,
    createdById: 1,
  },
  {
    // id: 10,
    homeTeamId: 2,
    awayTeamId: 5,
    homeTeamScore: 0,
    awayTeamScore: 0,
    field: 'FIELD_1',
    gameDateTime: new Date(1685905200000), // June 4, 2023, 3pm ET
    gameResult: null,
    isForfeit: null,
    leagueId: 1,
    createdById: 1,
  },
  {
    // id: 11,
    homeTeamId: 3,
    awayTeamId: 5,
    homeTeamScore: 0,
    awayTeamScore: 0,
    field: 'FIELD_2',
    gameDateTime: new Date(1685905200000), // June 4, 2023, 3pm ET
    gameResult: null,
    isForfeit: null,
    leagueId: 1,
    createdById: 1,
  },
  {
    // id: 12,
    homeTeamId: 4,
    awayTeamId: 7,
    homeTeamScore: 0,
    awayTeamScore: 0,
    field: 'FIELD_3',
    gameDateTime: new Date(1685905200000), // June 4, 2023, 3pm ET
    gameResult: null,
    isForfeit: null,
    leagueId: 1,
    createdById: 1,
  },
  {
    // id: 13,
    homeTeamId: 4,
    awayTeamId: 6,
    homeTeamScore: 0,
    awayTeamScore: 0,
    field: 'FIELD_1',
    gameDateTime: new Date(1686506400000), // June 11, 2023, 2pm ET
    gameResult: null,
    isForfeit: null,
    leagueId: 1,
    createdById: 1,
  },
  {
    // id: 14,
    homeTeamId: 1,
    awayTeamId: 6,
    homeTeamScore: 0,
    awayTeamScore: 0,
    field: 'FIELD_2',
    gameDateTime: new Date(1686506400000), // June 11, 2023, 2pm ET
    gameResult: null,
    isForfeit: null,
    leagueId: 1,
    createdById: 1,
  },
  {
    // id: 15,
    homeTeamId: 2,
    awayTeamId: 5,
    homeTeamScore: 0,
    awayTeamScore: 0,
    field: 'FIELD_3',
    gameDateTime: new Date(1686506400000), // June 11, 2023, 2pm ET
    gameResult: null,
    isForfeit: null,
    leagueId: 1,
    createdById: 1,
  },
  {
    // id: 16,
    homeTeamId: 3,
    awayTeamId: 7,
    homeTeamScore: 0,
    awayTeamScore: 0,
    field: 'FIELD_1',
    gameDateTime: new Date(1686510000000), // June 11, 2023, 3pm ET
    gameResult: null,
    isForfeit: null,
    leagueId: 1,
    createdById: 1,
  },
  {
    // id: 17,
    homeTeamId: 1,
    awayTeamId: 2,
    homeTeamScore: 0,
    awayTeamScore: 0,
    field: 'FIELD_2',
    gameDateTime: new Date(1686510000000), // June 11, 2023, 3pm ET
    gameResult: null,
    isForfeit: null,
    leagueId: 1,
    createdById: 1,
  },
  {
    // id: 18,
    homeTeamId: 3,
    awayTeamId: 4,
    homeTeamScore: 0,
    awayTeamScore: 0,
    field: 'FIELD_3',
    gameDateTime: new Date(1686510000000), // June 11, 2023, 3pm ET
    gameResult: null,
    isForfeit: null,
    leagueId: 1,
    createdById: 1,
  },
];

/**
 * NOTE: using prisma.createMany gave me a foreignKey error, so using map + prisma.create instead.
 */
export const gameDataFactory = async (
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >,
) => {
  gameData.forEach(async _ => {
    await prisma.game.create({
      data: {
        league: {
          connect: {
            id: _.leagueId,
          },
        },
        field: _.field as FieldNumbers,
        homeTeam: {
          connect: {
            id: _.homeTeamId,
          },
        },
        awayTeam: {
          connect: {
            id: _.awayTeamId,
          },
        },
        homeTeamScore: _.homeTeamScore,
        awayTeamScore: _.awayTeamScore,
        gameDateTime: _.gameDateTime,
        gameResult: _.gameResult as GameResult,
        isForfeit: _.isForfeit,
        createdBy: {
          connect: {
            id: _.createdById,
          },
        },
      },
    });
  });
};
