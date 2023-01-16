import styled from 'styled-components';

export interface IMatchData {
  metadata: any;
  info: any;
}

interface IMatchListProps {
  data: IMatchData[];
}

export default function MatchList(props: IMatchListProps) {

  return (
    <ul>
      {props.data.map((match: IMatchData) => (
        <li key={match.metadata.matchId}>
          {match.metadata.matchId}
        </li>
      ))}
    </ul>
  );
}