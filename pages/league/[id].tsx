import {gql, useQuery} from '@apollo/client';
import {Button, Grid, Loading, Text, useTheme} from '@nextui-org/react';
import {League} from '@prisma/client';
import {useRouter} from 'next/router';
import React from 'react';
import {format} from 'date-fns';
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import {LeagueScheduleTable} from '@/components/LeagueScheduleTable';

const GetLeagueDetailsQuery = gql`
  query getLeagueDetailsQuery($leagueId: Int!) {
    getLeague(leagueId: $leagueId) {
      id
      name
      description
      startDate
      endDate
      teams {
        id
      }
      teamsMax
      games {
        id
      }
      location
      leagueType
      status
      signupDeadline
      modifiedAt
    }
  }
`;

const LeagueDetailPage = () => {
  const {query} = useRouter();
  const leagueId = Number(query.id);
  const {data, error, loading} = useQuery(GetLeagueDetailsQuery, {
    variables: {leagueId},
  });
  const {theme} = useTheme();

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

  const league: League | undefined = data.getLeague;

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
            <Text>TBD</Text>
          </TabPanel>
          <TabPanel>
            <Text>TBD</Text>
          </TabPanel>
        </Tabs>
      </Grid>
    </Grid.Container>
  );
};

export default LeagueDetailPage;
