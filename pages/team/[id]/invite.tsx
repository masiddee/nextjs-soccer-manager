import {Button, Grid, Input, Loading, Text, useTheme} from '@nextui-org/react';
import {GetServerSideProps} from 'next';
import {Team, User} from '@/graphql/generated-types';
import React, {useState} from 'react';
import {useRouter} from 'next/router';
import {useGetPlayerDetailsByEmailQuery} from '@/graphql/hooks/getPlayer';
import {useUser} from '@auth0/nextjs-auth0/client';

type InputData = {
  firstName?: string;
  lastName?: string;
  email?: string;
};

const Invite = () => {
  const {asPath, ...router} = useRouter();
  const {user} = useUser();
  const {id: teamId, email, otp} = router.query;
  const {theme} = useTheme();
  const {data, error, loading} = useGetPlayerDetailsByEmailQuery(
    (email ?? user?.email) as string,
  );
  const loginUrl = `/api/auth/login?returnTo=${process.env.NEXT_PUBLIC_APP_URL}${asPath}`;
  const [inputData, setInputData] = useState<InputData>({
    firstName: undefined,
    lastName: undefined,
    email: undefined,
  });

  const handleChange = (e: any) => {
    setInputData({...inputData, [e.target.name]: e.target.value});
  };

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
          <Text size="$4xl">Uh oh... {error?.message}</Text>
        </Grid>
      </Grid.Container>
    );

  const player: User | undefined = data.getUserByEmail;
  const team: Team | undefined | null = player?.teams?.find(
    team => team?.id === teamId,
  );

  console.log({player, team, TEAM_ID: teamId});

  if (player?.inviteOtpCode !== otp) {
    return (
      <Grid.Container lg>
        <Grid
          justify="space-between"
          alignItems="center"
          css={{
            marginBottom: theme?.space[18],
          }}>
          <Text size="$2xl">
            Invalid invitation Code. Please login/sign up to join a team.
          </Text>
        </Grid>
      </Grid.Container>
    );
  }

  if (!user) {
    return (
      <Grid.Container lg>
        <Grid
          justify="space-between"
          alignItems="center"
          css={{
            marginBottom: theme?.space[18],
          }}>
          <div>
            <Text size="$2xl">
              Welcome {player?.firstName} {player?.lastName}
            </Text>
            <Text>
              You have been invited to join {team?.name}. Please login or sign
              up to accept the invitation from {team?.captain.firstName}{' '}
              {team?.captain.lastName}
            </Text>
          </div>

          <div>
            <Button onPress={() => router.push(loginUrl)}>
              Login or Sign Up
            </Button>
          </div>
        </Grid>
      </Grid.Container>
    );
  } else {
    return (
      <Grid.Container lg>
        <Grid
          justify="space-between"
          alignItems="center"
          css={{
            marginBottom: theme?.space[18],
          }}>
          <div>
            <Text size="$2xl">
              You have been invited to join <span>{team?.name}</span> by{' '}
              <span>
                {team?.captain.firstName} {team?.captain.lastName}
              </span>
              .
            </Text>
            <Text>
              Please confirm your player details below to complete your
              registration:
            </Text>
          </div>
        </Grid>

        <Grid xs={6}>
          <Input
            aria-label="First Name"
            label="First Name"
            name="firstName"
            fullWidth
            disabled
            initialValue={'Test First Name'}
            onChange={handleChange}
          />

          <Input
            aria-label="Last Name"
            label="Last Name"
            name="lastName"
            fullWidth
            // disabled
            initialValue={'Test Last Name'}
            onChange={handleChange}
          />

          <Input
            aria-label="Preferred Position"
            label="Preferred Position"
            name="preferredPosition"
            fullWidth
            // disabled
            initialValue={'STRIKER'}
            onChange={handleChange}
          />

          <Input
            aria-label="Gender"
            label="Gender"
            name="gender"
            fullWidth
            // disabled
            initialValue={'MALE'}
            onChange={handleChange}
          />

          <Input
            aria-label="Birth Date"
            label="Birth Date"
            name="birthDate"
            fullWidth
            // disabled
            initialValue={'01/01/1990'}
            onChange={handleChange}
          />

          <Button onClick={() => router.push('/league/dummyLeagueId-2')}>
            Confirm Registration
          </Button>
        </Grid>
      </Grid.Container>
    );
  }
};

export default Invite;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  // const cookies = new Cookies(req, res);
  // const otpParam = (query.otp as string) || '';

  // cookies.set('soccerOtpInviteCode', otpParam);

  return {
    props: {},
  };
};
