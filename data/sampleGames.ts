'use strict';

import {
  FieldNumbers,
  GameResult,
  Prisma,
  PrismaClient,
  Team,
  User,
} from '@prisma/client';

/**
 * NOTE: the foreign key IDs may need to be changed for your local Prisma instance
 */
const gameData = [
  {
    homeTeamScore: 4,
    awayTeamScore: 0,
    field: 'FIELD_1',
    gameDateTime: new Date(1685296800000), // May 28, 2023, 2pm ET
    gameResult: 'AWAY_WIN',
    isForfeit: null,
  },
  {
    homeTeamScore: 0,
    awayTeamScore: 1,
    field: 'FIELD_2',
    gameDateTime: new Date(1685296800000), // May 28, 2023, 2pm ET
    gameResult: 'AWAY_WIN',
    isForfeit: null,
  },
  {
    homeTeamScore: 2,
    awayTeamScore: 1,
    field: 'FIELD_3',
    gameDateTime: new Date(1685296800000), // May 28, 2023, 2pm ET
    gameResult: 'HOME_WIN',
    isForfeit: null,
  },
  {
    homeTeamScore: 1,
    awayTeamScore: 1,
    field: 'FIELD_1',
    gameDateTime: new Date(1685300400000), // May 28, 2023, 3pm ET
    gameResult: 'TIE',
    isForfeit: null,
  },
  {
    homeTeamScore: 0,
    awayTeamScore: 0,
    field: 'FIELD_2',
    gameDateTime: new Date(1685300400000), // May 28, 2023, 3pm ET
    gameResult: 'TIE',
    isForfeit: null,
  },
  {
    homeTeamScore: 2,
    awayTeamScore: 3,
    field: 'FIELD_3',
    gameDateTime: new Date(1685300400000), // May 28, 2023, 3pm ET
    gameResult: 'AWAY_WIN',
    isForfeit: null,
  },
  {
    homeTeamScore: 2,
    awayTeamScore: 5,
    field: 'FIELD_1',
    gameDateTime: new Date(1685901600000), // June 4, 2023, 2pm ET
    gameResult: 'AWAY_WIN',
    isForfeit: null,
  },
  {
    homeTeamScore: 0,
    awayTeamScore: 0,
    field: 'FIELD_2',
    gameDateTime: new Date(1685901600000), // June 4, 2023, 2pm ET
    gameResult: 'TIE',
    isForfeit: null,
  },
  {
    homeTeamScore: 2,
    awayTeamScore: 0,
    field: 'FIELD_3',
    gameDateTime: new Date(1685901600000), // June 4, 2023, 2pm ET
    gameResult: 'HOME_WIN',
    isForfeit: null,
  },
  {
    homeTeamScore: 0,
    awayTeamScore: 0,
    field: 'FIELD_1',
    gameDateTime: new Date(1685905200000), // June 4, 2023, 3pm ET
    gameResult: null,
    isForfeit: null,
  },
  {
    homeTeamScore: 0,
    awayTeamScore: 0,
    field: 'FIELD_2',
    gameDateTime: new Date(1685905200000), // June 4, 2023, 3pm ET
    gameResult: null,
    isForfeit: null,
  },
  {
    homeTeamScore: 0,
    awayTeamScore: 0,
    field: 'FIELD_3',
    gameDateTime: new Date(1685905200000), // June 4, 2023, 3pm ET
    gameResult: null,
    isForfeit: null,
  },
  {
    homeTeamScore: 0,
    awayTeamScore: 0,
    field: 'FIELD_1',
    gameDateTime: new Date(1686506400000), // June 11, 2023, 2pm ET
    gameResult: null,
    isForfeit: null,
  },
  {
    homeTeamScore: 0,
    awayTeamScore: 0,
    field: 'FIELD_2',
    gameDateTime: new Date(1686506400000), // June 11, 2023, 2pm ET
    gameResult: null,
    isForfeit: null,
  },
  {
    homeTeamScore: 0,
    awayTeamScore: 0,
    field: 'FIELD_3',
    gameDateTime: new Date(1686506400000), // June 11, 2023, 2pm ET
    gameResult: null,
    isForfeit: null,
  },
  {
    homeTeamScore: 0,
    awayTeamScore: 0,
    field: 'FIELD_1',
    gameDateTime: new Date(1686510000000), // June 11, 2023, 3pm ET
    gameResult: null,
    isForfeit: null,
  },
  {
    homeTeamScore: 0,
    awayTeamScore: 0,
    field: 'FIELD_2',
    gameDateTime: new Date(1686510000000), // June 11, 2023, 3pm ET
    gameResult: null,
    isForfeit: null,
  },
  {
    homeTeamScore: 0,
    awayTeamScore: 0,
    field: 'FIELD_3',
    gameDateTime: new Date(1686510000000), // June 11, 2023, 3pm ET
    gameResult: null,
    isForfeit: null,
  },
];

type GameDataFactoryArgs = {
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;
  captain: User;
  allTeams: Team[];
  leagueId: string;
};

/**
 * NOTE: using prisma.createMany gave me a foreignKey error, so using map + prisma.create instead.
 */
export const gameDataFactory = async ({
  prisma,
  captain,
  allTeams,
  leagueId,
}: GameDataFactoryArgs) => {
  gameData.forEach(async (_, i) => {
    await prisma.game.create({
      data: {
        league: {
          connect: {
            id: leagueId,
          },
        },
        field: _.field as FieldNumbers,
        homeTeam: {
          connect: {
            id: allTeams[Math.floor(Math.random() * allTeams.length)].id,
          },
        },
        awayTeam: {
          connect: {
            id: allTeams[Math.floor(Math.random() * allTeams.length)].id,
          },
        },
        homeTeamScore: _.homeTeamScore,
        awayTeamScore: _.awayTeamScore,
        gameDateTime: _.gameDateTime,
        gameResult: _.gameResult as GameResult,
        isForfeit: _.isForfeit,
        createdBy: {
          connect: {
            id: captain.id,
          },
        },
      },
    });
  });
};
