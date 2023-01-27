import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

export interface IMatchData {
  metadata: any;
  info: any;
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
  sightWardsBoughtInGame: number;
  items: number[];
  summonerSpellIds: number[];
}

export interface IReducedMatchData {
  matchId: string;
  currentSummonerIndex: number;
  participantsId: string[];
  gameDuration: string;
  gameEndTimestamp: number;
  gameMode: string;
  gameType: string;
  participantsInfo: IParticipantsInfoData[];
}

interface IMatchListProps {
  data: IReducedMatchData[];
}

const MatchListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
`

const MatchListItem = styled.li`
  display: flex;
  flex-direction: row;
  margin: 1rem;
  list-style: none;
  /* border-radius: 12px; */
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
  padding: 1rem;
  align-self: center;
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

const BlueTeamList = styled.ul`
  margin: 0.5rem;
  display: flex;
  flex-direction: column;
  /* background-color: #0000ff8c; */
`

const RedTeamList = styled.ul`
  margin: 0.5rem;
  display: flex;
  flex-direction: column;
  /* background-color: #ff00009c; */
`

const Foo = styled.div`
  flex: 1;
`

export default function MatchList(props: IMatchListProps) {

  return (
    <MatchListContainer>
      {props.data.map((match: IReducedMatchData) => {

        const player: IParticipantsInfoData = match.participantsInfo[match.currentSummonerIndex];

        return (
          <MatchListItem key={match.matchId}>
            <MatchResultColorBox
              win={player.win} />
            <MatchInfo>
              <p>matchId: {match.matchId}</p>
              <p>{match.gameMode}</p>
              <p>{player.win ? "win" : "loss"}</p>
              <p>{match.gameDuration}</p>
            </MatchInfo>
            <SummonerInfoBox>
              <Image 
                src={`/image/champion/${player.championName}.png`} 
                alt="err" 
                width={50} 
                height={50}
              />
              <SummonerSpellInfoBox>
                {player.summonerSpellIds.map((id: number) => (
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
              {player.items.map((id: number) => (
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
              K/D/A: {player.kills}&nbsp;/&nbsp;{player.deaths}&nbsp;/&nbsp;{player.assists}
              <br />totalDamageDealt: {player.totalDamageDealtToChampions}
              <br />totalDamageTaken: {player.totalDamageTaken}
              <br />cs: {player.totalMinionsKilled}
            </DetailBox>
            <Foo />
            <BlueTeamList>
              <p>#blue Team</p>
              {match.participantsInfo.map((pData: IParticipantsInfoData) => {
                if (pData.teamId === 100) {

                  return (
                    <Link 
                      href={`/search/${pData.summonerName}`} 
                      key={pData.summonerName}>
                        {pData.summonerName}
                    </Link>
                  );
                }
              })}
            </BlueTeamList>
            <RedTeamList>
              <p>#red Team</p>
              {match.participantsInfo.map((pData: IParticipantsInfoData) => {
                if (pData.teamId === 200) {

                  return (
                    <Link 
                      href={`/search/${pData.summonerName}`} 
                      key={pData.summonerName}>
                        {pData.summonerName}
                    </Link>
                  );
                }
              })}
            </RedTeamList>
            <br />
          </MatchListItem>)}
      )}
    </MatchListContainer>
  );
}