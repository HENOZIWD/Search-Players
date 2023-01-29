import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import Match, { IParticipantsInfoData, IReducedMatchData } from './match';

interface IMatchListProps {
  data: IReducedMatchData[];
}

const MatchListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
`

export default function MatchList(props: IMatchListProps) {

  return (
    <MatchListContainer>
      {props.data.map((match: IReducedMatchData) => {

        const player: IParticipantsInfoData = match.participantsInfo[match.currentSummonerIndex];

        return (
          <Match 
            key={match.matchId}
            player={player}
            match={match}
          />
        )}
      )}
    </MatchListContainer>
  );
}