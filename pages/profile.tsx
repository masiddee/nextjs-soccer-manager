import {getSession} from '@auth0/nextjs-auth0';
import {useUser} from '@auth0/nextjs-auth0/client';
import {GetServerSideProps} from 'next';
import React from 'react';

const Profile = () => {
  const {user} = useUser();

  return (
    <div>
      <h1>Profile</h1>
      <main>
        <p>Name: {user?.name}</p>
      </main>
    </div>
  );
};

export default Profile;

export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
  const session = await getSession(req, res);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
      props: {},
    };
  } else {
    return {
      props: {},
    };
  }
};
