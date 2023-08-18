import {
  sampleAdminUsers,
  sampleAtlantaUnitedPlayers,
  sampleAustinFcPlayers,
} from '../data/samplePlayers';
import {gameDataFactory} from '../data/sampleGames';
import {teamDataFactory} from '../data/sampleTeams';
import {PrismaClient, User} from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  /** 1) Create Admin and Team users based on sample player data */
  await prisma.user.createMany({
    data: [
      ...sampleAdminUsers,
      ...sampleAtlantaUnitedPlayers,
      ...sampleAustinFcPlayers,
    ],
  });

  /** 2) Get all users from Prisma, and find my sample user to use as captain */
  const allUsers = await prisma.user.findMany();
  const myUser = allUsers?.find(
    _ => _.email === 'mansoor.siddeeq@formidable.com',
  ) as User;

  /** 3) Create 2 leagues -- one INACTIVE and the other ACTIVE */
  await prisma.league.createMany({
    data: [
      {
        id: 'dummyLeagueId-1',
        name: 'MLS Preseason',
        description: '2023 Major League Soccer preseason',
        season: 'Preseason',
        startDate: new Date(2023, 1, 1, 0, 0, 1),
        endDate: new Date(2023, 2, 24, 23, 59, 59),
        status: 'INACTIVE',
        createdById: myUser.id,
      },
      {
        id: 'dummyLeagueId-2',
        name: 'MLS Regular Season',
        description: '2023 Major League Soccer season',
        season: 'Regular Season',
        startDate: new Date(2023, 2, 25, 0, 0, 1),
        endDate: new Date(2023, 10, 21, 23, 59, 59),
        status: 'ACTIVE',
        createdById: myUser.id,
      },
    ],
  });

  /** 4) Create teams using users from above, then get all teams */
  await teamDataFactory({prisma, captain: myUser, leagueId: 'dummyLeagueId-2'});
  const allTeams = await prisma.team.findMany();

  // It was throwing and error
  /** 5) Create games using sample game data and teams from Prisma */
  setTimeout(async () => {
    await gameDataFactory({
      prisma,
      captain: myUser,
      allTeams,
      leagueId: 'dummyLeagueId-2',
    });
  }, 200);
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log('Seed completed');
  })
  .catch(async e => {
    console.log(e);
    await prisma.$disconnect();
    process.exit();
  });
