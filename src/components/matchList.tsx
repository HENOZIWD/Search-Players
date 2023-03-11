import styled from 'styled-components';
import { IMatchData, IParticipantData } from '@/lib/search';
import Match from './match';

interface IMatchListProps {
  data: IMatchData[];
}

const MatchListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  /* width: 100vw; */
  align-items: center;
`

const MoreButton = styled.button`
  width: 50vw;
  padding: 1rem;
  margin: 0.5rem;
  border: 1px solid black;
  border-radius: 0.8rem;
  &:hover {
    background-color: lightgrey;
  }
`

export default function MatchList(props: IMatchListProps) {

  return (
    <MatchListContainer>
      {props.data.map((match: IMatchData) => {

        const player: IParticipantData = match.participantsInfo[Math.floor(match.currentSummonerIndex / 5)][match.currentSummonerIndex % 5];

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