import {CheckIcon} from '@/public/icons';
import {getFormattedDateTime} from '@/utils/helpers';
import {Card, Table, Text} from '@nextui-org/react';
import {FieldNumbers, Game} from '@prisma/client';
import React from 'react';

type LeagueGames = {
  homeTeam: string;
  awayTeam: string;
} & Omit<
  Game,
  | 'createdAt'
  | 'createdById'
  | 'modifiedAt'
  | 'leagueId'
  | 'homeTeamId'
  | 'awayTeamId'
>;

type TransformedLeagueGames = {
  gameDate: string;
  gameTime: string;
  gameDateTime: Date;
  games: Record<FieldNumbers, LeagueGames>;
};

export const LeagueScheduleTable = () => {
  const [pageNumber, setPageNumber] = React.useState(1);
  const columns: {name: string; uid: FieldNumbers | 'gameTime'}[] = [
    {name: '', uid: 'gameTime'},
    {name: 'Pitch 1', uid: 'FIELD_1'},
    {name: 'Pitch 2', uid: 'FIELD_2'},
    {name: 'Pitch 3', uid: 'FIELD_3'},
  ];
  const games: LeagueGames[] = [
    {
      id: 1,
      homeTeam: 'Atl United',
      awayTeam: 'FC Cincinnati',
      homeTeamScore: 4,
      awayTeamScore: 0,
      field: 'FIELD_1',
      gameDateTime: new Date(1685296800000), // May 28, 2023, 2pm ET
      gameResult: 'HOME_WIN',
      isForfeit: null,
    },
    {
      id: 2,
      homeTeam: 'Tottenham',
      awayTeam: 'Paris Saint German',
      homeTeamScore: 0,
      awayTeamScore: 1,
      field: 'FIELD_2',
      gameDateTime: new Date(1685296800000), // May 28, 2023, 2pm ET
      gameResult: 'AWAY_WIN',
      isForfeit: null,
    },
    {
      id: 3,
      homeTeam: 'Wrexham United',
      awayTeam: 'Liverpool',
      homeTeamScore: 2,
      awayTeamScore: 1,
      field: 'FIELD_3',
      gameDateTime: new Date(1685296800000), // May 28, 2023, 2pm ET
      gameResult: 'HOME_WIN',
      isForfeit: null,
    },
    {
      id: 4,
      homeTeam: 'Napoli',
      awayTeam: 'Ajax',
      homeTeamScore: 1,
      awayTeamScore: 1,
      field: 'FIELD_1',
      gameDateTime: new Date(1685300400000), // May 28, 2023, 3pm ET
      gameResult: 'TIE',
      isForfeit: null,
    },
    {
      id: 5,
      homeTeam: 'Porto',
      awayTeam: 'Rangers',
      homeTeamScore: 0,
      awayTeamScore: 0,
      field: 'FIELD_2',
      gameDateTime: new Date(1685300400000), // May 28, 2023, 3pm ET
      gameResult: 'TIE',
      isForfeit: null,
    },
    {
      id: 6,
      homeTeam: 'Bayern',
      awayTeam: 'Marseille',
      homeTeamScore: 2,
      awayTeamScore: 3,
      field: 'FIELD_3',
      gameDateTime: new Date(1685300400000), // May 28, 2023, 3pm ET
      gameResult: 'AWAY_WIN',
      isForfeit: null,
    },
    {
      id: 7,
      homeTeam: 'Arsenal',
      awayTeam: 'Chelsea',
      homeTeamScore: 2,
      awayTeamScore: 5,
      field: 'FIELD_1',
      gameDateTime: new Date(1685901600000), // June 4, 2023, 2pm ET
      gameResult: 'AWAY_WIN',
      isForfeit: null,
    },
    {
      id: 8,
      homeTeam: 'Sevilla',
      awayTeam: 'Real Madrid',
      homeTeamScore: 0,
      awayTeamScore: 0,
      field: 'FIELD_2',
      gameDateTime: new Date(1685901600000), // June 4, 2023, 2pm ET
      gameResult: 'TIE',
      isForfeit: null,
    },
    {
      id: 9,
      homeTeam: 'LA Galaxy',
      awayTeam: 'DC United',
      homeTeamScore: 2,
      awayTeamScore: 0,
      field: 'FIELD_3',
      gameDateTime: new Date(1685901600000), // June 4, 2023, 2pm ET
      gameResult: 'HOME_WIN',
      isForfeit: null,
    },
    {
      id: 10,
      homeTeam: 'Crystal Palace',
      awayTeam: 'Aston Villa',
      homeTeamScore: 0,
      awayTeamScore: 0,
      field: 'FIELD_1',
      gameDateTime: new Date(1685905200000), // June 4, 2023, 3pm ET
      gameResult: null,
      isForfeit: null,
    },
    {
      id: 11,
      homeTeam: 'West Ham',
      awayTeam: 'Everton',
      homeTeamScore: 0,
      awayTeamScore: 0,
      field: 'FIELD_2',
      gameDateTime: new Date(1685905200000), // June 4, 2023, 3pm ET
      gameResult: null,
      isForfeit: null,
    },
    {
      id: 12,
      homeTeam: 'Leeds United',
      awayTeam: 'Newcastle',
      homeTeamScore: 0,
      awayTeamScore: 0,
      field: 'FIELD_3',
      gameDateTime: new Date(1685905200000), // June 4, 2023, 3pm ET
      gameResult: null,
      isForfeit: null,
    },
    {
      id: 13,
      homeTeam: 'Barcelona',
      awayTeam: 'Inter Milan',
      homeTeamScore: 0,
      awayTeamScore: 0,
      field: 'FIELD_1',
      gameDateTime: new Date(1686506400000), // June 11, 2023, 2pm ET
      gameResult: null,
      isForfeit: null,
    },
    {
      id: 14,
      homeTeam: 'Man City',
      awayTeam: 'Man united',
      homeTeamScore: 0,
      awayTeamScore: 0,
      field: 'FIELD_2',
      gameDateTime: new Date(1686506400000), // June 11, 2023, 2pm ET
      gameResult: null,
      isForfeit: null,
    },
    {
      id: 15,
      homeTeam: 'FC Dallas',
      awayTeam: 'Seattle Sounders',
      homeTeamScore: 0,
      awayTeamScore: 0,
      field: 'FIELD_3',
      gameDateTime: new Date(1686506400000), // June 11, 2023, 2pm ET
      gameResult: null,
      isForfeit: null,
    },
    {
      id: 16,
      homeTeam: 'Chicago FC',
      awayTeam: 'Inter Miami',
      homeTeamScore: 0,
      awayTeamScore: 0,
      field: 'FIELD_1',
      gameDateTime: new Date(1686510000000), // June 11, 2023, 3pm ET
      gameResult: null,
      isForfeit: null,
    },
    {
      id: 17,
      homeTeam: 'Toronto FC',
      awayTeam: 'New York FC',
      homeTeamScore: 0,
      awayTeamScore: 0,
      field: 'FIELD_2',
      gameDateTime: new Date(1686510000000), // June 11, 2023, 3pm ET
      gameResult: null,
      isForfeit: null,
    },
    {
      id: 18,
      homeTeam: 'NY Redbulls',
      awayTeam: 'Nashville',
      homeTeamScore: 0,
      awayTeamScore: 0,
      field: 'FIELD_3',
      gameDateTime: new Date(1686510000000), // June 11, 2023, 3pm ET
      gameResult: null,
      isForfeit: null,
    },
  ];

  const transformLeagueData = (games: LeagueGames[]) => {
    const newGames = games.reduce(
      (acc: TransformedLeagueGames[], curr: LeagueGames, idx: number) => {
        const matchedIndex = acc.findIndex(
          (transformedGame: TransformedLeagueGames) => {
            const currDateTime = curr.gameDateTime || new Date();
            return (
              getFormattedDateTime(transformedGame.gameDateTime).date ===
                getFormattedDateTime(currDateTime).date &&
              getFormattedDateTime(transformedGame.gameDateTime).time ===
                getFormattedDateTime(currDateTime).time
            );
          },
        );

        if (matchedIndex !== -1) {
          const {gameDateTime, games} = acc[matchedIndex];
          const gameRow: TransformedLeagueGames = {
            gameDate: getFormattedDateTime(gameDateTime).date,
            gameTime: getFormattedDateTime(gameDateTime).time,
            gameDateTime,
            games: {
              ...games,
              [String(curr.field)]: curr,
            },
          };

          acc.splice(matchedIndex, 1, gameRow);
        } else {
          const currGameDateTime = curr.gameDateTime || new Date();
          const gameRow: TransformedLeagueGames = {
            gameDate: getFormattedDateTime(currGameDateTime).date,
            gameTime: getFormattedDateTime(currGameDateTime).time,
            gameDateTime: currGameDateTime,
            games: {
              [String(curr.field)]: curr,
            } as any,
          };

          acc.push(gameRow);
        }

        return acc;
      },
      [],
    );

    return newGames;
  };

  const renderCell = (item: TransformedLeagueGames, columnKey: React.Key) => {
    if (columnKey === 'gameTime') {
      return (
        <div>
          <Text weight={'bold'} size={'$xl'} css={{textAlign: 'center'}}>
            {item.gameTime}
          </Text>
        </div>
      );
    } else {
      const cellValue = item.games[columnKey as FieldNumbers];

      return (
        <Card>
          <Card.Body css={{paddingLeft: '$xl'}}>
            <Text
              css={{fontFamily: '$mono'}}
              size={'$lg'}
              weight={cellValue.gameResult === 'HOME_WIN' ? 'bold' : 'normal'}>
              {cellValue.homeTeam} - {cellValue.homeTeamScore}{' '}
              {cellValue.gameResult === 'HOME_WIN' && (
                <CheckIcon size={30} fill={'green'} />
              )}
            </Text>
            <Text css={{fontFamily: '$mono'}}>vs</Text>
            <Text
              css={{fontFamily: '$mono'}}
              size={'$lg'}
              weight={cellValue.gameResult === 'AWAY_WIN' ? 'bold' : 'normal'}>
              {cellValue.awayTeam} - {cellValue.awayTeamScore}{' '}
              {cellValue.gameResult === 'AWAY_WIN' && (
                <CheckIcon size={30} fill={'green'} />
              )}
            </Text>
          </Card.Body>
        </Card>
      );
    }
  };

  return (
    <>
      <Text h3 css={{paddingLeft: '$lg', fontFamily: '$mono'}}>
        {/* Display Game dates as header */}
        {
          Array.from(
            new Set(transformLeagueData(games).map(({gameDate}) => gameDate)),
          )[pageNumber - 1]
        }
      </Text>
      <Table
        aria-label="Example table with static content"
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
        <Table.Body items={transformLeagueData(games)}>
          {(item: TransformedLeagueGames) => (
            <Table.Row key={item.gameDate + item.gameTime}>
              {columnKey => (
                <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
              )}
            </Table.Row>
          )}
        </Table.Body>
        <Table.Pagination
          shadow
          noMargin
          align="center"
          rowsPerPage={2}
          onPageChange={page => setPageNumber(page)}
        />
      </Table>
    </>
  );
};
