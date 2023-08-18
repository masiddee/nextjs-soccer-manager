import {useGetPlayerDetailsByIdQuery} from '@/graphql/hooks/getPlayer';
import {Button, Grid, Loading, Text, useTheme} from '@nextui-org/react';
import {User} from '@prisma/client';
import {useRouter} from 'next/router';
import React from 'react';

const PlayerDetailPage = () => {
  const {query} = useRouter();
  const playerId = query.id as string;
  const {data, error, loading} = useGetPlayerDetailsByIdQuery(playerId);
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

  const player: User | undefined = data.getUserById;

  if (!player) {
    return (
      <Grid.Container>
        <Grid>
          <Text>
            Oops... We could not find the player you are looking for. Please try
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
            {`${player.firstName} ${player.lastName}`}
          </Text>
          <Text css={{fontFamily: '$mono'}}>Email: {player.email}</Text>
          <Text css={{fontFamily: '$mono'}}>Gender: {player.gender}</Text>
          <Text css={{fontFamily: '$mono'}}>
            Preferred Position: {player.preferredPosition}
          </Text>
          <Text css={{fontFamily: '$mono'}}>
            Skill Level: {player.skillLevel}
          </Text>
        </div>
      </Grid>
    </Grid.Container>
  );
};

export default PlayerDetailPage;
