import React from 'react';
import Link from 'next/link';
import {useUser} from '@auth0/nextjs-auth0/client';
import {Grid, useTheme} from '@nextui-org/react';

const Header = () => {
  const {user} = useUser();
  const {theme} = useTheme();

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
              <Link href="/api/auth/logout">Logout</Link>
            </div>
          ) : (
            <div>
              <Link href="/api/auth/login">Login</Link>
            </div>
          )}
        </nav>
      </Grid>
    </Grid.Container>
  );
};

export default Header;
