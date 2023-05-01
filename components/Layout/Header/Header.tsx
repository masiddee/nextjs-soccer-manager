import React from 'react';
import Link from 'next/link';
import {useUser} from '@auth0/nextjs-auth0/client';
import styles from './Header.module.css';

const Header = () => {
  const {user} = useUser();

  return (
    <header>
      <div className={styles.container}>
        <Link href="/">Home</Link>
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
      </div>
    </header>
  );
};

export default Header;
