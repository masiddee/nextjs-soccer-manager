import {SendInviteData} from '@/pages/api/sendInvite';
import {RemoveIcon} from '@/public/icons';
import {validateEmail} from '@/utils/helpers';
import {Button, Card, Grid, Input, Link, Table, Text} from '@nextui-org/react';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {User} from '@/graphql/generated-types';
import {useRemovePlayerMutation} from '@/graphql/hooks/removePlayer';

type TeamManagerTableProps = {
  teamId: string;
  roster: User[];
  rosterMax: number;
};

type RosterPlayer = Pick<
  User,
  'email' | 'firstName' | 'lastName' | 'id' | 'skillLevel' | 'status'
>;

type SendInviteResponse = {
  data: {
    message: string;
    rosterPlayer: RosterPlayer;
  };
};

type InputData = {
  firstName?: string;
  lastName?: string;
  email?: string;
};

export default function TeamManagerTable({
  teamId,
  roster,
  rosterMax,
}: TeamManagerTableProps) {
  const columns: {name: string; uid: string}[] = [
    {name: 'First Name', uid: 'firstName'},
    {name: 'Last Name', uid: 'lastName'},
    {name: 'Email', uid: 'email'},
    {name: 'Status', uid: 'status'},
    {name: '', uid: 'remove'},
  ];
  const [teamPlayers, setTeamPlayers] = useState<RosterPlayer[]>(roster);
  const [inputData, setInputData] = useState<InputData>({
    firstName: undefined,
    lastName: undefined,
    email: undefined,
  });
  const isTeamFull = teamPlayers && teamPlayers.length >= rosterMax;
  const rosterLimitText = isTeamFull
    ? `Team Full. No more players can be added`
    : `${teamPlayers.length} of ${rosterMax} players addeds`;
  const [removePlayer, {data, loading, error}] = useRemovePlayerMutation();

  // useEffect(() => {
  //   console.log({TEAM_ROSTER_CHANGE: roster});
  // }, [roster]);

  const handleChange = (e: any) => {
    setInputData({...inputData, [e.target.name]: e.target.value});
  };

  const handleSendInvite = async (args: SendInviteData) => {
    const response = await axios.post<any, SendInviteResponse>(
      'http://localhost:3000/api/sendInvite',
      args,
    );

    const {rosterPlayer} = response.data;
    setTeamPlayers([...teamPlayers, {...rosterPlayer}]);
    setInputData({
      firstName: undefined,
      lastName: undefined,
      email: undefined,
    });
  };

  const handleRevokeInvitation = async (playerId: string) => {
    try {
      const {data} = await removePlayer({
        variables: {input: {userId: playerId, teamId}},
      });

      setTeamPlayers(data.removePlayer.roster);
    } catch (err) {
      console.log({ERROR: err});
    }
  };

  const renderCell = (item: RosterPlayer, columnKey: React.Key) => {
    switch (columnKey) {
      case 'firstName':
      case 'lastName':
      case 'email':
      case 'status':
        return <Text>{item[columnKey]}</Text>;
      case 'remove':
        return item.status === 'INVITED' ? (
          <Link
            aria-label="Revoke Invitation"
            onPress={() => handleRevokeInvitation(item.id)}>
            <RemoveIcon fill="grey" />
          </Link>
        ) : null;
    }
  };

  return (
    <>
      <Grid.Container gap={1} justify="center">
        <Grid xs={3}>
          <Input
            aria-label="First Name"
            placeholder="First Name"
            name="firstName"
            fullWidth
            disabled={isTeamFull}
            onChange={handleChange}
          />
        </Grid>
        <Grid xs={3}>
          <Input
            aria-label="Last Name"
            placeholder="Last Name"
            name="lastName"
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
              if (
                inputData.email &&
                inputData.firstName &&
                inputData.lastName
              ) {
                if (validateEmail(inputData.email)) {
                  return handleSendInvite({
                    captainName: 'Super Man',
                    leagueName: 'MLS All-Stars',
                    firstName: inputData.firstName,
                    lastName: inputData.lastName,
                    email: inputData.email,
                    teamId,
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
                {(item: RosterPlayer) => (
                  <Table.Row key={item.email + item.id}>
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
