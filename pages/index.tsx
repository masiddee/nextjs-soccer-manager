import Head from 'next/head';
// import Image from 'next/image';
import {Inter} from 'next/font/google';
// import styles from '@/styles/Home.module.css';
import {useUser} from '@auth0/nextjs-auth0/client';
import {Button, Grid, Text} from '@nextui-org/react';
import {useRouter} from 'next/router';

const inter = Inter({subsets: ['latin']});

export default function Home() {
  const {user} = useUser();
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Soccer Manager - NextJS</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid.Container>
        <Grid>
          {user ? (
            <>
              <Text>Welcome, {user.nickname ?? 'Default User'}!</Text>
            </>
          ) : (
            <Text>Please login via the link above.</Text>
          )}
          <br />
          <Text>Check out our open Leagues!</Text>
          {/* TODO: Update this to pull in the actual leagueIds */}
          <Button onClick={() => router.push('/league/dummyLeagueId-2')}>
            View our Leagues
          </Button>
        </Grid>
      </Grid.Container>
    </>
  );
}
