import {Grid} from '@nextui-org/react';
import {GetServerSideProps} from 'next';
import React from 'react';
import Cookies from 'cookies';
import {useRouter} from 'next/router';

const Invite = () => {
  const {query} = useRouter();
  const teamId = query.slug;

  return (
    <Grid.Container lg>
      <div>
        Login or Sign Up to accept the invitation from {teamId ?? 'this team'}.
      </div>
    </Grid.Container>
  );
};

export default Invite;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  const cookies = new Cookies(req, res);
  const otpParam = (query.otp as string) || '';

  cookies.set('soccer-otp', otpParam);

  return {
    props: {},
  };
};
