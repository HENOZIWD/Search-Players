import styled from 'styled-components';

export interface IMatchData {
  metadata: any;
  info: any;
}

export interface IParticipantsInfoData {
  summonerId: string;
  summonerName: string;
  puuid: string;
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
  visionScore: number;
  sightWardsBoughtInGame: number;
  item0: number;
  item1: number;
  item2: number;
  item3: number;
  item4: number;
  item5: number;
  item6: number;
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

export default function MatchList(props: IMatchListProps) {

  return (
    <ul>
      {props.data.map((match: IReducedMatchData) => (
        <li key={match.matchId}>
            <p>matchId: {match.matchId}</p>
            {/* <p>{match.gameEndTimestamp}</p> */}
            <p>currentSummoner: {match.participantsInfo[match.currentSummonerIndex].championName}</p>
            <p>{match.participantsInfo[match.currentSummonerIndex].win ? "win" : "lose"}</p>
            <p>gameDuration: {match.gameDuration}</p>
            <p>participants</p>
            <p>#blue Team</p>
            {match.participantsInfo.map((pData: IParticipantsInfoData) => {
              if (pData.teamId === 100) {

                return (
                  <p key={pData.summonerId}>{pData.summonerName}</p>
                );
              }
            })}
            <p>#red Team</p>
            {match.participantsInfo.map((pData: IParticipantsInfoData) => {
              if (pData.teamId === 200) {

                return (
                  <p key={pData.summonerId}>{pData.summonerName}</p>
                );
              }
            })}
            {/* <p>{match.gameMode}</p>
            <p>{match.gameType}</p> */}
            <br />
        </li>
      ))}
    </ul>
  );
}