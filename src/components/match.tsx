import React, { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';

interface IPerksData {
  statPerks: {
    defense: number;
    flex: number;
    offense: number;
  }
  styles: {
    primaryStyle: {
      selections: number[];
      style: number;
    }
    subStyle: {
      selections: number[];
      style: number;
    }
  }
}

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
  perks: IPerksData;
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
  width: 80rem;
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

const ChampionLevelBox = styled.div<{ size: number }>`
  position: absolute;
  color: white;
  background-color: black;
  border: 1px solid white;
  display: flex;
  bottom: 0px;
  left: 0px;
  /* margin: ${props => props.size * 0.3}rem; */
  padding: ${props => props.size * 0.1}rem;
  border-radius: ${props => props.size * 0.3}rem;
  font-size: ${props => props.size * 0.8}rem;
`

const SummonerInfoBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  margin: 0.5rem;
  padding: 0.25rem;
  /* align-self: center; */
  align-self: center;
  align-items: center;
  height: fit-content;
`

const SummonerSpellPerkInfoBox = styled.div`
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
  width: 2rem;
`

const MatchThumbnail = styled.div`
  display: flex;
  flex-direction: row;
  list-style: none;
`

const MatchDetail = styled.table`
  margin-top: 0.5rem;
  align-self: center;
  /* border-spacing: 5px 5px; */
`


const DetailSummonerBox = styled.tr`
  position: relative;
  padding: 0.5rem;
  margin: 1rem;
  /* display: table-row; */
  /* align-self: center; */
  align-self: center;
  align-items: center;
  height: fit-content;
`

export default function Match(props: IMatchProps) {

  const [detailStatus, setDetailStatus] = useState<boolean>(false);

  const date: string = new Date(props.match.gameEndTimestamp).toLocaleString();

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
          <p>{date}</p>
        </MatchInfo>
        <SummonerInfoBox>
          <Image 
            src={`/image/champion/${props.player.championName}.png`} 
            alt="err" 
            width={50} 
            height={50}
          />
          <ChampionLevelBox size={1.05}>{props.player.champLevel}</ChampionLevelBox>
          <SummonerSpellPerkInfoBox>
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
          </SummonerSpellPerkInfoBox>
          <SummonerSpellPerkInfoBox>
            <Image
              src={`/image/perk/${props.player.perks.styles.primaryStyle.style}/${props.player.perks.styles.primaryStyle.selections[0]}.png`} 
              alt="err"
              width={24}
              height={24}
              style={{ margin: 2, marginBottom: 1, backgroundColor: 'black', borderRadius: '9999px' }}
            />
            <Image
              src={`/image/perk/${props.player.perks.styles.subStyle.style}.png`} 
              alt="err"
              width={24}
              height={24}
              style={{ margin: 2, marginBottom: 1, padding: 2 }}
            />
          </SummonerSpellPerkInfoBox>
        </SummonerInfoBox>
        <SummonerItemBox>
          {props.player.items.map((id: number, index: number) => (
            <Image 
              key={index}
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
        <DetailButton onClick={onDetailClick}>{detailStatus ? "Less" : "More"}</DetailButton>
      </MatchThumbnail>
      {!detailStatus ? null : 
      <>
      <MatchDetail>
        <thead>
          <DetailSummonerBox>
            <th colSpan={4}>Blue Team</th><th>K/D/A</th><th>CS</th><th>Damage</th>{props.match.gameMode === "CLASSIC" ? (<th>Vision</th>) : null}<th>Items</th>
          </DetailSummonerBox>
        </thead>
        <tbody>
          {props.match.participantsInfo.map((participant: IParticipantsInfoData) => {

            if (participant.teamId === 100) {

            return (
              <DetailSummonerBox key={participant.summonerName}>
                <td>
                  <Image
                    src={`/image/champion/${participant.championName}.png`}
                    alt="err"
                    width={40}
                    height={40}
                  />
                  <ChampionLevelBox size={0.9}>{participant.champLevel}</ChampionLevelBox>
                </td>
                <td>
                  <SummonerSpellPerkInfoBox>
                    {participant.summonerSpellIds.map((id: number) => (
                      <Image
                        key={id}
                        src={`/image/summonerSpell/${id}.png`}
                        alt="err"
                        width={20}
                        height={20}
                      />
                    ))}
                  </SummonerSpellPerkInfoBox>
                </td>
                <td>
                  <SummonerSpellPerkInfoBox>
                    <Image
                      src={`/image/perk/${participant.perks.styles.primaryStyle.style}/${participant.perks.styles.primaryStyle.selections[0]}.png`} 
                      alt="err"
                      width={18}
                      height={18}
                      style={{ margin: 2, marginBottom: 1, backgroundColor: 'black', borderRadius: '9999px' }}
                    />
                    <Image
                      src={`/image/perk/${participant.perks.styles.subStyle.style}.png`} 
                      alt="err"
                      width={18}
                      height={18}
                      style={{ margin: 2, marginBottom: 1, padding: 2 }}
                    />
                  </SummonerSpellPerkInfoBox>
                </td>
                <td>
                  <Link 
                    href={`/search/${participant.summonerName}`} 
                    key={participant.summonerName}
                  >
                    {participant.summonerName}
                  </Link>
                </td>
                <td>{participant.kills}&nbsp;/&nbsp;{participant.deaths}&nbsp;/&nbsp;{participant.assists}</td>
                <td>{participant.totalMinionsKilled}</td>
                <td>
                  damageDealt:&nbsp;{participant.totalDamageDealtToChampions}
                  &nbsp;damageTaken:&nbsp;{participant.totalDamageTaken}
                </td>
                {props.match.gameMode === "CLASSIC" ? (<td>visionScore:&nbsp;{participant.visionScore}
                  &nbsp;visionWardBought:&nbsp;{participant.visionWardsBoughtInGame}</td>) : null}
                <td>
                  <SummonerItemBox>
                    {participant.items.map((id: number, index: number) => (
                      <Image
                        key={index}
                        src={`/image/item/${id}.png`}
                        alt="err"
                        width={25}
                        height={25}
                      />
                    ))}
                  </SummonerItemBox>
                </td>
              </DetailSummonerBox>
          )}})}
        </tbody>
      </MatchDetail>
      <MatchDetail>
        <thead>
          <DetailSummonerBox>
            <th colSpan={4}>Red Team</th><th>K/D/A</th><th>CS</th><th>Damage</th>{props.match.gameMode === "CLASSIC" ? (<th>Vision</th>) : null}<th>Items</th>
          </DetailSummonerBox>
        </thead>
        <tbody>
          {props.match.participantsInfo.map((participant: IParticipantsInfoData) => {

            if (participant.teamId === 200) {

            return (
              <DetailSummonerBox key={participant.summonerName}>
                <td>
                  <Image
                    src={`/image/champion/${participant.championName}.png`}
                    alt="err"
                    width={40}
                    height={40}
                  />
                  <ChampionLevelBox size={0.9}>{participant.champLevel}</ChampionLevelBox>
                </td>
                <td>
                  <SummonerSpellPerkInfoBox>
                    {participant.summonerSpellIds.map((id: number) => (
                      <Image
                        key={id}
                        src={`/image/summonerSpell/${id}.png`}
                        alt="err"
                        width={20}
                        height={20}
                      />
                    ))}
                  </SummonerSpellPerkInfoBox>
                </td>
                <td>
                  <SummonerSpellPerkInfoBox>
                    <Image
                      src={`/image/perk/${participant.perks.styles.primaryStyle.style}/${participant.perks.styles.primaryStyle.selections[0]}.png`} 
                      alt="err"
                      width={18}
                      height={18}
                      style={{ margin: 2, marginBottom: 1, backgroundColor: 'black', borderRadius: '9999px' }}
                    />
                    <Image
                      src={`/image/perk/${participant.perks.styles.subStyle.style}.png`} 
                      alt="err"
                      width={18}
                      height={18}
                      style={{ margin: 2, marginBottom: 1, padding: 2 }}
                    />
                  </SummonerSpellPerkInfoBox>
                </td>
                <td>
                  <Link 
                    href={`/search/${participant.summonerName}`} 
                    key={participant.summonerName}
                  >
                    {participant.summonerName}
                  </Link>
                </td>
                <td>{participant.kills}&nbsp;/&nbsp;{participant.deaths}&nbsp;/&nbsp;{participant.assists}</td>
                <td>{participant.totalMinionsKilled}</td>
                <td>
                  damageDealt:&nbsp;{participant.totalDamageDealtToChampions}
                  &nbsp;damageTaken:&nbsp;{participant.totalDamageTaken}
                </td>
                {props.match.gameMode === "CLASSIC" ? (<td>visionScore:&nbsp;{participant.visionScore}
                  &nbsp;visionWardBought:&nbsp;{participant.visionWardsBoughtInGame}</td>) : null}
                <td>
                  <SummonerItemBox>
                    {participant.items.map((id: number, index: number) => (
                      <Image
                        key={index}
                        src={`/image/item/${id}.png`}
                        alt="err"
                        width={25}
                        height={25}
                      />
                    ))}
                  </SummonerItemBox>
                </td>
              </DetailSummonerBox>
          )}})}
        </tbody>
      </MatchDetail>
      </>}
    </MatchListItem>
  )
}