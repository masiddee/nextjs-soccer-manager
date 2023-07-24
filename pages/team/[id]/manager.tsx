import {PlayerInviteData} from '@/pages/api/playerInvite';
import {RemoveIcon} from '@/public/icons';
import {validateEmail} from '@/utils/helpers';
import {gql, useQuery} from '@apollo/client';
import {Button, Card, Grid, Input, Link, Table, Text} from '@nextui-org/react';
import axios from 'axios';
import {useRouter} from 'next/router';
import React, {useState} from 'react';

// type GetEmailBodyParams = {
//   inviteLink: string;
//   name: string;
//   captainName: string;
//   leagueName: string;
// };

// type GetEmailSubjectParams = {
//   leagueName: string;
//   captainName: string;
// };

type PlayerInfo = {
  name: string;
  email: string;
  status?: string;
};

type PlayerInviteResponse = {
  data: {
    message: string;
    playerInfo: PlayerInfo;
  };
};

type InputData = {
  fullName?: string;
  email?: string;
};

export default function TeamManager() {
  const columns: {name: string; uid: string}[] = [
    {name: 'Name', uid: 'name'},
    {name: 'Email', uid: 'email'},
    {name: 'Status', uid: 'status'},
    {name: '', uid: 'remove'},
  ];
  const {query} = useRouter();
  const teamId = Number(query.id?.toString());
  // const {data, error, loading} = useQuery(gql``, {
  //   variables: {teamId},
  // });
  const [teamPlayers, setTeamPlayers] = useState<PlayerInfo[]>([]);
  const [inputData, setInputData] = useState<InputData>({
    fullName: undefined,
    email: undefined,
  });
  const rosterMax = 10;
  const isTeamFull = teamPlayers.length >= rosterMax;
  const rosterLimitText = isTeamFull
    ? `Team Full. No more players can be added`
    : `${teamPlayers.length} of ${rosterMax} Players Invited`;

  const handleChange = (e: any) => {
    setInputData({...inputData, [e.target.name]: e.target.value});
  };

  const handlePlayerInvite = async (args: PlayerInviteData) => {
    const response = await axios.post<any, PlayerInviteResponse>(
      'http://localhost:3000/api/playerInvite',
      args,
    );

    const {playerInfo} = response.data;
    setTeamPlayers([...teamPlayers, {...playerInfo, status: 'INVITED'}]);
    setInputData({fullName: undefined, email: undefined});
  };

  const handleRemovePlayer = (player: PlayerInfo) => {
    setTeamPlayers(teamPlayers.filter(_ => _.email !== player.email));
  };

  const renderCell = (item: PlayerInfo, columnKey: React.Key) => {
    switch (columnKey) {
      case 'name':
      case 'email':
      case 'status':
        return <Text>{item[columnKey]}</Text>;
      case 'remove':
        return (
          <Link
            aria-label="Remove Player"
            onPress={() => handleRemovePlayer(item)}>
            <RemoveIcon fill="grey" />
          </Link>
        );
    }
  };

  return (
    <>
      <Grid.Container gap={1} justify="center">
        <Grid xs={3}>
          <Input
            aria-label="Full Name"
            placeholder="Full Name"
            name="fullName"
            fullWidth
            disabled={isTeamFull}
            onChange={handleChange}
          />
        </Grid>
        <Grid xs={3}>
          <Input
            aria-label="Email"
            placeholder="Email"
            name="email"
            fullWidth
            disabled={isTeamFull}
            onChange={handleChange}
          />
        </Grid>
        <Grid xs={3}>
          <Button
            disabled={isTeamFull}
            onPress={() => {
              if (inputData.email && inputData.fullName) {
                if (validateEmail(inputData.email)) {
                  return handlePlayerInvite({
                    captainName: 'Super Man',
                    leagueName: 'MLS All-Stars',
                    name: inputData.fullName,
                    inviteLink: 'https://www.google.com',
                    email: inputData.email,
                  });
                } else {
                  alert('Please enter a valid email address.');
                }
              } else {
                alert('Input fields must not be empty.');
              }
            }}>
            Invite Player
          </Button>
        </Grid>
        <Grid xs={3}>
          <Text>{rosterLimitText}</Text>
        </Grid>
      </Grid.Container>

      {teamPlayers.length ? (
        <Grid.Container lg>
          <Grid>
            <Table
              lined
              aria-label="Player Manager table with player status"
              css={{
                height: 'auto',
                minWidth: '100%',
              }}>
              <Table.Header columns={columns}>
                {column => (
                  <Table.Column key={column.uid} align="center">
                    {column.name}
                  </Table.Column>
                )}
              </Table.Header>
              <Table.Body items={teamPlayers}>
                {(item: PlayerInfo) => (
                  <Table.Row key={item.email + item.name}>
                    {columnKey => (
                      <Table.Cell css={{textAlign: 'center'}}>
                        {renderCell(item, columnKey)}
                      </Table.Cell>
                    )}
                  </Table.Row>
                )}
              </Table.Body>
            </Table>
          </Grid>
        </Grid.Container>
      ) : (
        <Grid.Container justify="center">
          <Grid xs={4}>
            <Card>
              <Card.Body>
                <Text>Looks like you do not have any players.</Text>
                <Text>Invited players will show up here.</Text>
              </Card.Body>
            </Card>
          </Grid>
        </Grid.Container>
      )}
    </>
  );
}
