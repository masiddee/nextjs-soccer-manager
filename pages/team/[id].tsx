import {gql, useQuery} from '@apollo/client';
import {Button, Card, Grid, Loading, Text, useTheme} from '@nextui-org/react';
import {useRouter} from 'next/router';
import React from 'react';
import {format} from 'date-fns';
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import {Maybe, Team, User} from '@/graphql/generated-types';
import Link from 'next/link';

const GetTeamDetailsQuery = gql`
  query getTeamDetailsQuery($teamId: Int!) {
    getTeam(teamId: $teamId) {
      id
      name
      captain {
        firstName
        lastName
      }
      roster {
        id
        firstName
        lastName
        preferredPosition
      }
      rosterMax
      rosterMin
      feeStatus
      division
      wins
      losses
      draws
      pointsFor
      pointsAgainst
      gamesHomeTeam {
        id
        homeTeamScore
      }
      leagues {
        name
      }
      createdAt
      modifiedAt
    }
  }
`;

export default function TeamDetailPage() {
  const {query} = useRouter();
  const teamId = Number(query.id?.toString());
  const {data, error, loading} = useQuery(GetTeamDetailsQuery, {
    variables: {teamId},
  });
  const {theme} = useTheme();
  const router = useRouter();

  if (loading)
    return (
      <Grid.Container>
        <Grid>
          <Loading size="xl">
            <Text>Loading Team Data...</Text>
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

  const team: Team = data.getTeam;

  if (!team) {
    return (
      <Grid.Container>
        <Grid>
          <Text>
            Oops... We could not find the team you are looking for. Please try
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
        <div
          style={{
            marginBottom: '1rem',
          }}>
          <Text size="$4xl" css={{fontFamily: '$mono'}}>
            {team.name}
          </Text>
          <Text css={{fontFamily: '$mono'}}>
            Fee: {team.feeStatus} | Roster: {team.rosterMax} | Division:{' '}
            {team.division}
            {/* Sunday | Co-ed | Outdoor/Turf | 7v7 | Maynard High School */}
          </Text>
        </div>
        <div>
          <Button>Edit Team</Button>
        </div>
      </Grid>

      <Grid>
        <Tabs>
          <TabList>
            <Tab>
              <Text>Team Details</Text>
            </Tab>
            <Tab>
              <Text>Team players</Text>
            </Tab>
            <Tab>
              <Text>Team Standings</Text>
            </Tab>
          </TabList>

          <TabPanel>
            <Text>
              Captain: {team.captain.firstName} {team.captain.lastName}
            </Text>

            <Text>League: {team.leagues?.at(0)?.name}</Text>

            <Text>
              Created Date: {format(Number(team.createdAt), 'MM/dd/yyyy')}
            </Text>

            <Text>
              End Date: {format(Number(team.modifiedAt), 'MM/dd/yyyy')}
            </Text>

            <br />

            <Grid.Container gap={2} justify="space-evenly">
              <Grid xs={4} justify="center">
                <div
                  style={{
                    textAlign: 'center',
                  }}>
                  Wins
                  <Text size="$7xl">{team.wins}</Text>
                </div>
              </Grid>

              <Grid xs={4} justify="center">
                <div
                  style={{
                    textAlign: 'center',
                  }}>
                  Losses
                  <Text size="$7xl">{team.losses}</Text>
                </div>
              </Grid>

              <Grid xs={4} justify="center">
                <div
                  style={{
                    textAlign: 'center',
                  }}>
                  Draws
                  <Text size="$7xl">{team.draws}</Text>
                </div>
              </Grid>
            </Grid.Container>
          </TabPanel>
          <TabPanel>
            <Grid.Container gap={2} justify="space-around">
              {team.roster?.map((player: Maybe<User>) => {
                return (
                  <Grid xs={3} key={`player-${player?.id}`}>
                    <Card>
                      <Card.Body>
                        <Text h3>
                          {player?.firstName} {player?.lastName}
                        </Text>

                        <Text size="$xs">{player?.preferredPosition}</Text>
                      </Card.Body>
                      <Card.Footer>
                        <Grid.Container gap={2} justify="space-around">
                          <Grid>
                            <Button auto flat>
                              Edit
                            </Button>
                          </Grid>
                          <Grid>
                            <Button auto light color="primary" onClick={() => router.push(`/player/${player?.id}`)}>
                              View player
                            </Button>
                          </Grid>
                        </Grid.Container>
                      </Card.Footer>
                    </Card>
                  </Grid>
                );
              })}
            </Grid.Container>
          </TabPanel>
          <TabPanel>
            <Text>TBD</Text>
          </TabPanel>
        </Tabs>
      </Grid>
    </Grid.Container>
  );
}
