import {
  sampleAdminUsers,
  sampleAtlantaUnitedPlayers,
  sampleAustinFcPlayers,
} from '../data/samplePlayers';
import {gameDataFactory} from '../data/sampleGames';
import {teamDataFactory} from '../data/sampleTeams';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Admin users + players
  await prisma.user.createMany({
    data: [
      ...sampleAdminUsers,
      ...sampleAtlantaUnitedPlayers,
      ...sampleAustinFcPlayers,
    ],
  });

  // Leagues
  await prisma.league.createMany({
    data: [
      {
        id: 1,
        name: 'MLS Preseason',
        description: '2023 Major League Soccer preseason',
        season: 'Preseason',
        startDate: new Date(2023, 1, 1, 0, 0, 1),
        endDate: new Date(2023, 2, 24, 23, 59, 59),
        status: 'INACTIVE',
        createdById: 1,
      },
      {
        id: 2,
        name: 'MLS Regular Season',
        description: '2023 Major League Soccer season',
        season: 'Regular Season',
        startDate: new Date(2023, 2, 25, 0, 0, 1),
        endDate: new Date(2023, 10, 21, 23, 59, 59),
        status: 'ACTIVE',
        createdById: 1,
      },
    ],
  });

  // Teams
  await teamDataFactory(prisma);

  // It was throwing and error
  setTimeout(async () => {
    await gameDataFactory(prisma);
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
