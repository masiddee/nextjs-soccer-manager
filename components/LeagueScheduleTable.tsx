import {LeagueGames} from '@/pages/league/[id]';
import {CheckIcon} from '@/public/icons';
import {getFormattedDateTime} from '@/utils/helpers';
import {Card, Table, Text} from '@nextui-org/react';
import {FieldNumbers} from '@prisma/client';
import React from 'react';

type LeagueScheduleTableProps = {
  leagueGames: LeagueGames[] | undefined;
};

type TransformedLeagueGames = {
  gameDate: string;
  gameTime: string;
  gameDateTime: Date | string;
  games: Record<FieldNumbers, LeagueGames>;
};

export const LeagueScheduleTable = ({
  leagueGames,
}: LeagueScheduleTableProps) => {
  const [pageNumber, setPageNumber] = React.useState(1);
  const columns: {name: string; uid: FieldNumbers | 'gameTime'}[] = [
    {name: '', uid: 'gameTime'},
    {name: 'Pitch 1', uid: 'FIELD_1'},
    {name: 'Pitch 2', uid: 'FIELD_2'},
    {name: 'Pitch 3', uid: 'FIELD_3'},
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
              {cellValue.homeTeam.name} - {cellValue.homeTeamScore}{' '}
              {cellValue.gameResult === 'HOME_WIN' && (
                <CheckIcon size={30} fill={'green'} />
              )}
            </Text>
            <Text css={{fontFamily: '$mono'}}>vs</Text>
            <Text
              css={{fontFamily: '$mono'}}
              size={'$lg'}
              weight={cellValue.gameResult === 'AWAY_WIN' ? 'bold' : 'normal'}>
              {cellValue.awayTeam.name} - {cellValue.awayTeamScore}{' '}
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
            new Set(
              transformLeagueData(leagueGames as LeagueGames[]).map(
                ({gameDate}) => gameDate,
              ),
            ),
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
        <Table.Body items={transformLeagueData(leagueGames as LeagueGames[])}>
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
