'use strict';
import {League} from '@prisma/client';
import prisma from '../../lib/prisma';

export const leagueResolvers = {
  Query: {
    getLeague: async (parent: any, {leagueId}: any, context: any) => {
      // const user: User | null = (await context).user;

      // if (!user) {
      //   throw new Error('You need to be logged in to update this user');
      // }

      // if (user?.userType !== 'ADMIN') {
      //   throw new Error(
      //     'Insufficient access. Need to be an Admin to edit leagues',
      //   );
      // }

      const league: League | null = await prisma.league.findFirst({
        where: {id: leagueId},
      });

      return league;
    },
    getAllLeagues: async () => {
      const leagues: League[] = await prisma.league.findMany();

      return leagues;
    },
  },
  League: {
    teams: async (parent: any) => {
      const leagueTeams = await prisma.team.findMany({
        where: {leagueId: parent.id},
      });

      return leagueTeams;
    },
    games: async (parent: any) => {
      const leagueGames = await prisma.game.findMany({
        where: {leagueId: parent.id},
      });

      return leagueGames;
    },
  },
  Game: {
    homeTeam: async (parent: any) => {
      const __homeTeam = await prisma.team.findFirst({
        where: {id: parent.homeTeamId},
      });

      return __homeTeam;
    },
    awayTeam: async (parent: any) => {
      const __awayTeam = await prisma.team.findFirst({
        where: {id: parent.awayTeamId},
      });

      return __awayTeam;
    },
  },
};
