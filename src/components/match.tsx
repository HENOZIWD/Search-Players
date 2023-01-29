import React, { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';


export interface IParticipantsInfoData {
  summonerName: string;
  teamId: number;
  win: boolean;
  kills: number;
  deaths: number;
  assists: number;
  champLevel: number;
  championId: number;
  championName: string;
  goldEarned: number;
  totalDamageDealtToChampions: number;
  totalDamageTaken: number;
  totalMinionsKilled: number;
  visionScore: number;
  visionWardsBoughtInGame: number;
  items: number[];
  summonerSpellIds: number[];
}

export interface IReducedMatchData {
  matchId: string;
  currentSummonerIndex: number;
  gameDuration: string;
  gameEndTimestamp: number;
  gameMode: string;
  gameType: string;
  participantsInfo: IParticipantsInfoData[];
}

interface IMatchProps {
  match: IReducedMatchData;
  player: IParticipantsInfoData;
}

const MatchListItem = styled.li`
  display: flex;
  flex-direction: column;
  margin: 1rem;
  list-style: none;
  /* border-radius: 12px; */
`

const Foo = styled.div`
  flex: 1;
`

const MatchResultColorBox = styled.div<{ win: boolean }>`
  width: 16px;
  margin: 0.4rem;
  border-radius: 12px;
  background-color: ${props => props.win ? '#0000ff64;' : '#ff00006a;'};
`

const MatchInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5rem;
  align-self: center;
`

const SummonerInfoBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0.5rem;
  /* align-self: center; */
  align-items: center;
`

const SummonerSpellInfoBox = styled.div`
  display: flex;
  flex-direction: column;
`

const SummonerItemBox = styled.div`
  display: flex;
  flex-direction: row;
  align-self: center;
`

const DetailBox = styled.div`
  align-self: center;
  padding: 20px;
`

const TeamList = styled.ul`
  margin: 0.5rem;
  display: flex;
  flex-direction: column;
`

const DetailButton = styled.button`
  border: 1px solid black;
  border-radius: 20px;
  &:hover {
    background-color: lightgrey;
  }
`

const MatchThumbnail = styled.div`
  display: flex;
  flex-direction: row;
  list-style: none;
`

const MatchDetail = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.5rem;
`


export default function Match(props: IMatchProps) {

  const [detailStatus, setDetailStatus] = useState<boolean>(false);

  const onDetailClick = (event: React.MouseEvent) => {
    event.preventDefault();
    setDetailStatus(!detailStatus);
  }

  return (
    <MatchListItem>
      <MatchThumbnail>
        <MatchResultColorBox
          win={props.player.win} />
        <MatchInfo>
          <p>matchId: {props.match.matchId}</p>
          <p>{props.match.gameMode}</p>
          <p>{props.player.win ? "win" : "lose"}</p>
          <p>{props.match.gameDuration}</p>
        </MatchInfo>
        <SummonerInfoBox>
          <Image 
            src={`/image/champion/${props.player.championName}.png`} 
            alt="err" 
            width={50} 
            height={50}
          />
          <SummonerSpellInfoBox>
            {props.player.summonerSpellIds.map((id: number) => (
              <Image 
                key={id}
                src={`/image/summonerSpell/${id}.png`} 
                alt="err" 
                width={24} 
                height={24}
                style={{ margin: 2, marginBottom: 1 }}
              />
            ))}
          </SummonerSpellInfoBox>
        </SummonerInfoBox>
        <SummonerItemBox>
          {props.player.items.map((id: number) => (
            <Image 
              key={id}
              src={`/image/item/${id}.png`} 
              alt="err" 
              width={40} 
              height={40}
              style={{ margin: 2 }}
            />
          ))}
        </SummonerItemBox>
        <DetailBox>
          K/D/A: {props.player.kills}&nbsp;/&nbsp;{props.player.deaths}&nbsp;/&nbsp;{props.player.assists}
          <br />level: {props.player.champLevel}
          <br />totalDamageDealt: {props.player.totalDamageDealtToChampions}
          <br />totalDamageTaken: {props.player.totalDamageTaken}
          <br />cs: {props.player.totalMinionsKilled}
        </DetailBox>
        <Foo />
        <TeamList>
          <p>#blue Team</p>
          {props.match.participantsInfo.map((pData: IParticipantsInfoData) => {
            if (pData.teamId === 100) {

              return (
                <Link 
                  href={`/search/${pData.summonerName}`} 
                  key={pData.summonerName}
                >
                  {pData.summonerName}
                </Link>
              );
            }
          })}
        </TeamList>
        <TeamList>
          <p>#red Team</p>
          {props.match.participantsInfo.map((pData: IParticipantsInfoData) => {
            if (pData.teamId === 200) {

              return (
                <Link 
                  href={`/search/${pData.summonerName}`} 
                  key={pData.summonerName}
                >
                  {pData.summonerName}
                </Link>
              );
            }
          })}
        </TeamList>
        <DetailButton onClick={onDetailClick}>More</DetailButton>
      </MatchThumbnail>
      {!detailStatus ? null : 
      <MatchDetail>
        {props.match.participantsInfo.map((participant: IParticipantsInfoData) => (
          <SummonerInfoBox key={participant.summonerName}>
            <Image
              src={`/image/champion/${participant.championName}.png`}
              alt="err"
              width={30}
              height={30}
            />
            <SummonerSpellInfoBox>
              {participant.summonerSpellIds.map((id: number) => (
                <Image
                  key={id}
                  src={`/image/summonerSpell/${id}.png`}
                  alt="err"
                  width={15}
                  height={15}
                />
              ))}
            </SummonerSpellInfoBox>
            &nbsp;
            <Link 
              href={`/search/${participant.summonerName}`} 
              key={participant.summonerName}
            >
              {participant.summonerName}
            </Link>
            &nbsp;{participant.kills}&nbsp;/&nbsp;{participant.deaths}&nbsp;/&nbsp;{participant.assists}
            &nbsp;cs:&nbsp;{participant.totalMinionsKilled}
            &nbsp;damageDealt:&nbsp;{participant.totalDamageDealtToChampions}
            &nbsp;damageTaken:&nbsp;{participant.totalDamageTaken}
            {props.match.gameMode === "CLASSIC" ? (<>&nbsp;visionScore:&nbsp;{participant.visionScore}
            &nbsp;visionWardBought:&nbsp;{participant.visionWardsBoughtInGame}</>) : null}
            &nbsp;
            <SummonerItemBox>
              {participant.items.map((id: number) => (
                <Image
                  key={id}
                  src={`/image/item/${id}.png`}
                  alt="err"
                  width={25}
                  height={25}
                />
              ))}
            </SummonerItemBox>
          </SummonerInfoBox>
        ))}
      </MatchDetail>}
    </MatchListItem>
  )
}