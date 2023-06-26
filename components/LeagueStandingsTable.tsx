import React from 'react';
import {Table, Text} from '@nextui-org/react';
import {Team} from '@/graphql/generated-types';
import Link from 'next/link';

type LeagueStandingsProps = {
  leagueTeams: unknown[] | undefined | null;
};

type LeagueTeam = {
  rankPoints: number;
  pointDiff: number;
  rank?: number;
} & Omit<
  Team,
  | 'captain'
  | 'createdAt'
  | 'createdBy'
  | 'modifiedAt'
  | 'feeStatus'
  | 'gamesAwayTeam'
  | 'gamesHomeTeam'
  | 'leagues'
  | 'rosterMax'
  | 'rosterMin'
>;

const leagueTeamOrder = (leagueTeams: LeagueTeam[]) => {
  return leagueTeams
    .sort((a, b) => {
      if (a.rankPoints === b.rankPoints) {
        if (a.pointDiff === b.pointDiff) {
          return 0;
        } else {
          return a.pointDiff < b.pointDiff ? 1 : -1;
        }
      } else {
        return a.rankPoints < b.rankPoints ? 1 : -1;
      }
    })
    .map((lTeam, idx) => ({...lTeam, rank: idx + 1}));
};

export const LeagueStandingsTable = ({leagueTeams}: LeagueStandingsProps) => {
  const columns: {name: string; uid: string}[] = [
    {name: 'Rank', uid: 'rank'},
    {name: 'Team', uid: 'name'},
    {name: 'Wins', uid: 'wins'},
    {name: 'Losses', uid: 'losses'},
    {name: 'Draws', uid: 'draws'},
    {name: 'Points For', uid: 'pointsFor'},
    {name: 'Points Against', uid: 'pointsAgainst'},
    {name: 'Points Diff', uid: 'pointDiff'},
    {name: 'Rank Points', uid: 'rankPoints'},
  ];
  const renderCell = (item: LeagueTeam, columnKey: React.Key) => {
    switch (columnKey) {
      case 'rank':
        return <Text>{item.rank}</Text>;
      case 'name':
        return (
          <Text>
            <Link href={`/team/${item.id}`}>{item[columnKey]}</Link>
          </Text>
        );
      case 'wins':
      case 'losses':
      case 'draws':
      case 'pointsFor':
      case 'pointsAgainst':
      case 'pointDiff':
      case 'rankPoints':
        return <Text>{item[columnKey]}</Text>;
    }
  };

  function isLeagueTeams(teams: unknown[]): teams is Team[] {
    return (teams as Team[]).some(team => team.__typename === 'Team');
  }

  const transformTeams = (
    teams: unknown[] | undefined | null,
  ): LeagueTeam[] | undefined => {
    if (!teams || !isLeagueTeams(teams) || !Boolean(teams.length)) return;

    const leagueTeams = teams.map(team => {
      const {id, name, wins, losses, draws, pointsAgainst, pointsFor} = team;
      const rankPoints: number = (wins as number) * 3 + (draws as number);
      const pointDiff: number =
        (pointsFor as number) - (pointsAgainst as number);

      return {
        id,
        name,
        wins,
        losses,
        draws,
        pointsAgainst,
        pointsFor,
        rankPoints,
        pointDiff,
      };
    });

    return leagueTeamOrder(leagueTeams);
  };

  return (
    <div>
      <Text>LeagueStandingsTable</Text>

      <Table
        lined
        aria-label="League Standings Table with static content"
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
        <Table.Body items={transformTeams(leagueTeams)}>
          {(item: LeagueTeam) => (
            <Table.Row key={item.id + item.name}>
              {columnKey => (
                <Table.Cell css={{textAlign: 'center'}}>
                  {renderCell(item, columnKey)}
                </Table.Cell>
              )}
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  );
};
