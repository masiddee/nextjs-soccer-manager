import React from 'react';
import Link from 'next/link';
import {useUser} from '@auth0/nextjs-auth0/client';
import {Grid, useTheme, Text} from '@nextui-org/react';
import {useRouter} from 'next/router';

const Header = () => {
  const {user} = useUser();
  const {theme} = useTheme();
  const {asPath} = useRouter();
  const loginUrl = `/api/auth/login?returnTo=${process.env.NEXT_PUBLIC_APP_URL}${asPath}`;

  return (
    <Grid.Container
      justify="space-between"
      alignItems="center"
      css={{height: theme?.space['3xl']}}>
      <Grid>
        <Link href="/">Home</Link>
      </Grid>
      <Grid>
        <nav>
          {user ? (
            <div>
              <Text>Welcome, {user.email}</Text>
              <Link href="/api/auth/logout">Logout</Link>
            </div>
          ) : (
            <div>
              <Link href={loginUrl}>Login</Link>
            </div>
          )}
        </nav>
      </Grid>
    </Grid.Container>
  );
};

export default Header;
