import {gql, useQuery} from '@apollo/client';
import {Button, Grid, Loading, Text, useTheme} from '@nextui-org/react';
import {useRouter} from 'next/router';
import React from 'react';
import {format} from 'date-fns';
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import {LeagueScheduleTable} from '@/components/LeagueScheduleTable';
import {Game, League} from '@/graphql/generated-types';
import {LeagueStandingsTable} from '@/components/LeagueStandingsTable';

const GetLeagueDetailsQuery = gql`
  query getLeagueDetailsQuery($leagueId: String!) {
    getLeague(leagueId: $leagueId) {
      id
      name
      description
      startDate
      endDate
      teams {
        id
        name
        wins
        losses
        draws
        pointsFor
        pointsAgainst
      }
      teamsMax
      games {
        id
        homeTeam {
          id
          name
        }
        awayTeam {
          id
          name
        }
        homeTeamScore
        awayTeamScore
        field
        gameDateTime
        gameResult
        isForfeit
      }
      location
      leagueType
      status
      signupDeadline
      modifiedAt
    }
  }
`;

type GetLeagueDetailsQueryTypes = {
  getLeague: League;
};

export type LeagueGames = Omit<
  Game,
  'createdAt' | 'createdBy' | 'modifiedAt' | 'league' | '__typename'
>;

function isGames(unknown: unknown[]): unknown is Game[] {
  return (unknown as Game[]).some(game => game.__typename === 'Game');
}

const transformGames = (
  games: unknown[] | undefined | null,
): LeagueGames[] | undefined => {
  if (!games || !isGames(games) || !Boolean(games.length)) return;

  return (games as Game[]).map(game => {
    const {
      id,
      homeTeam,
      awayTeam,
      homeTeamScore,
      awayTeamScore,
      field,
      gameDateTime,
      gameResult,
      isForfeit,
    } = game;

    return {
      id,
      homeTeam,
      awayTeam,
      homeTeamScore,
      awayTeamScore,
      field,
      gameDateTime,
      gameResult,
      isForfeit,
    };
  });
};

const LeagueDetailPage = () => {
  const {query} = useRouter();
  const leagueId = query.id;
  const {data, error, loading} = useQuery<GetLeagueDetailsQueryTypes>(
    GetLeagueDetailsQuery,
    {
      variables: {leagueId},
    },
  );
  const {theme} = useTheme();
  const games = data?.getLeague.games;
  const teams = data?.getLeague.teams;

  if (loading)
    return (
      <Grid.Container>
        <Grid>
          <Loading size="xl">
            <Text>Loading League Data...</Text>
          </Loading>
        </Grid>
      </Grid.Container>
    );

  if (error)
    return (
      <Grid.Container>
        <Grid>
          <Text size="$4xl">Uh oh... {error.message}</Text>
        </Grid>
      </Grid.Container>
    );

  const league: League | undefined = data?.getLeague;

  if (!league) {
    return (
      <Grid.Container>
        <Grid>
          <Text>
            Oops... We could not find the league you are looking for. Please try
            again.
          </Text>
        </Grid>
      </Grid.Container>
    );
  }

  return (
    <Grid.Container lg>
      <Grid
        justify="space-between"
        alignItems="center"
        css={{
          marginBottom: theme?.space[18],
        }}>
        <div>
          <Text size="$4xl" css={{fontFamily: '$mono'}}>
            {league.name}
          </Text>
          <Text css={{fontFamily: '$mono'}}>
            Sunday | Co-ed | Outdoor/Turf | 7v7 | Maynard High School
          </Text>
        </div>
        <div>
          <Button>Join League</Button>
        </div>
      </Grid>

      <Grid>
        <Tabs>
          <TabList>
            <Tab>
              <Text>League Details</Text>
            </Tab>
            <Tab>
              <Text>Game Schedule</Text>
            </Tab>
            <Tab>
              <Text>League Standings</Text>
            </Tab>
          </TabList>

          <TabPanel>
            <Text>
              Start Date: {format(Number(league.startDate), 'MM/dd/yyyy')}
            </Text>

            <Text>
              End Date: {format(Number(league.endDate), 'MM/dd/yyyy')}
            </Text>

            <br />
            <Text>Description: {league.description}</Text>
          </TabPanel>
          <TabPanel>
            <LeagueScheduleTable leagueGames={transformGames(games)} />
          </TabPanel>
          <TabPanel>
            <LeagueStandingsTable leagueTeams={teams} />
          </TabPanel>
        </Tabs>
      </Grid>
    </Grid.Container>
  );
};

export default LeagueDetailPage;
