import {Container} from '@nextui-org/react';
import React from 'react';
import Header from './Header/Header';

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({children}) => {
  return (
    <Container lg>
      <Header />
      {children}
    </Container>
  );
};

export default Layout;
