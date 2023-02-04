import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Match, { IParticipantsInfoData, IReducedMatchData } from './match';

interface IMatchListProps {
  data: IReducedMatchData[];
  puuid: string;
  summonerName: string;
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

  const [matchData, setMatchData] = useState<IReducedMatchData[]>(props.data);
  const [currentIdx, setCurrentIdx] = useState<number>(10);

  useEffect(() => {
    setMatchData(props.data);
  }, [props])

  const onMoreButtonClick = async (event: React.MouseEvent) => {
    event.preventDefault();

    const moreRes = await fetch(`/api/match/${props.puuid}?name=${props.summonerName}&start=${currentIdx}`);
    setCurrentIdx(currentIdx + 10);
    const moreData = await moreRes.json();

    setMatchData([
      ...matchData,
      ...moreData
    ]);
  }

  return (
    <MatchListContainer>
      {matchData.map((match: IReducedMatchData) => {

        const player: IParticipantsInfoData = match.participantsInfo[match.currentSummonerIndex];

        return (
          <Match 
            key={match.matchId}
            player={player}
            match={match}
          />
        )}
      )}
      <MoreButton onClick={onMoreButtonClick}>More</MoreButton>
    </MatchListContainer>
  );
}