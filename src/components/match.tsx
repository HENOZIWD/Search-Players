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
  wardsKilled: number;
  wardsPlaced: number;
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
  participantsInfo: IParticipantsInfoData[][];
  queueId: number;
  highestDamageDealt: number;
  highestDamageTaken: number;
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
  text-align: center;
  font-size: 0.9rem;
`

const TeamList = styled.ul`
  margin: 0.5rem;
  display: flex;
  flex-direction: column;
  font-size: 0.85rem;
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

const DetailMenu = styled.ul`
  display: flex;
  list-style: none;
  flex-direction: row;
  align-self: center;
  padding: 0.5rem;
`

const DetailTab = styled.li`
  padding: 0.8rem 2rem;

  &:hover {
    background-color: lightgray;
    cursor: pointer;
  }
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

const DamageBox = styled.div<{ damagePercent: number, color: string }>`
  border: 0.05rem solid black;
  border-radius: 0.35rem;
  margin: 0.1rem;
  background-image: linear-gradient(to right, ${props => props.color} 0%,
                                              ${props => props.color} ${props => props.damagePercent}%,
                                              white ${props => props.damagePercent}%, 
                                              white ${props => 100 - props.damagePercent}%);
`


export default function Match(props: IMatchProps) {

  const [detailStatus, setDetailStatus] = useState<boolean>(false);

  const date: string = new Date(props.match.gameEndTimestamp).toLocaleString();
  const gameMode = props.match.gameMode === "CLASSIC" ? "소환사의 협곡" :
                   props.match.gameMode === "ARAM" ? "칼바람 나락" :
                   props.match.gameMode;

  const queueType = props.match.queueId === 450 ? "무작위 총력전" :
                    props.match.queueId === 440 ? "자유 랭크 게임" :
                    props.match.queueId === 420 ? "솔로 랭크 게임" :
                    props.match.queueId === 900 ? "URF" :
                    props.match.queueId;

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
          {/* <p>{props.match.matchId}</p>
          <p>{gameMode}</p> */}
          <p>{queueType}</p>
          <p>{props.player.win ? "승리" : "패배"}</p>
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
        <DetailBox>
          {props.player.kills}&nbsp;/&nbsp;{props.player.deaths}&nbsp;/&nbsp;{props.player.assists}
        </DetailBox>
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
          CS&nbsp;{props.player.totalMinionsKilled}
          {props.match.gameMode !== "CLASSIC" ? null : 
            <>
            <br />
            시야&nbsp;점수&nbsp;{props.player.visionScore}
            <br />
            제어&nbsp;와드&nbsp;{props.player.visionWardsBoughtInGame}
            </>
          }
        </DetailBox>
        <Foo />
        {props.match.participantsInfo.map((team: IParticipantsInfoData[], teamIndex: number) => (
          <TeamList key={teamIndex}>
            <p style={{ backgroundColor: 'lightgray', alignSelf: 'center', padding: '0.05rem 0.15rem' }}>{teamIndex === 0 ? "Blue Team" : "Red Team"}</p>
            {team.map((participant: IParticipantsInfoData) => (
              <Link
                key={participant.summonerName}
                href={`/search/${participant.summonerName}`}
              >
                {participant.summonerName}
              </Link>
            ))}
          </TeamList>
        ))}
        <DetailButton onClick={onDetailClick}>{detailStatus ? "Less" : "More"}</DetailButton>
      </MatchThumbnail>
      {!detailStatus ? null : 
      <>

      {/* <DetailMenu>
        <DetailTab>종합</DetailTab>
        <DetailTab>빌드</DetailTab>
      </DetailMenu> */}
      {props.match.participantsInfo.map((team: IParticipantsInfoData[], teamIndex: number) => {

        return (
          <MatchDetail key={teamIndex}>
            <thead>
              <DetailSummonerBox>
                <th colSpan={4}>{teamIndex === 0 ? "Blue Team" : "Red Team"}</th><th>K/D/A</th><th>CS</th><th>Damage</th>{props.match.gameMode === "CLASSIC" ? (<th>Vision</th>) : null}<th>Items</th>
              </DetailSummonerBox>
            </thead>
            <tbody>
              {team.map((participant: IParticipantsInfoData) => (
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
                    <DamageBox damagePercent={Math.floor(participant.totalDamageDealtToChampions*100/props.match.highestDamageDealt)} color={'#ff7b7b'}>{participant.totalDamageDealtToChampions}</DamageBox>
                    <DamageBox damagePercent={Math.floor(participant.totalDamageTaken*100/props.match.highestDamageTaken)} color={'#9f9f9f'}>{participant.totalDamageTaken}</DamageBox>
                  </td>
                  {props.match.gameMode === "CLASSIC" ? (<td style={{ fontSize: '0.75rem' }}>시야 점수:&nbsp;{participant.visionScore}
                    &nbsp;제어 와드 구매:&nbsp;{participant.visionWardsBoughtInGame}</td>) : null}
                  <td>
                    <SummonerItemBox>
                      {participant.items.map((id: number, index: number) => (
                        <Image
                          key={index}
                          src={`/image/item/${id}.png`}
                          alt="err"
                          width={25}
                          height={25}
                          style={{ margin: 1 }}
                        />
                      ))}
                    </SummonerItemBox>
                  </td>
                </DetailSummonerBox>
              ))}
            </tbody>
          </MatchDetail>
        )
      })}

      </>}
    </MatchListItem>
  )
}