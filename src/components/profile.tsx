
export interface IRankData {
  leagueId: string;
  queueType: string;
  tier: string;
  rank: string;
  leaguePoints: number;
  wins: number;
  losses: number;
}

export interface IProfileData {
  accountId: string;
  profileIconId: number;
  revisionDate: number;
  name: string;
  id: string;
  puuid: string;
  summonerLevel: number;
  rank: IRankData[];
}

interface IProfileProps {
  data: IProfileData;
}

export default function Profile(props: IProfileProps) {
  
  return (
    <div>
      <p>summonerName: {props.data.name}</p>
      <p>summonerLevel: {props.data.summonerLevel}</p>
      <p>profileIconId: {props.data.profileIconId}</p>
      <br />
      {props.data.rank.map((rankData: IRankData) => (
        <>
          <p>{rankData.queueType}</p>
          <p>{rankData.tier}&nbsp;{rankData.rank}&nbsp;{rankData.leaguePoints}&nbsp;points</p>
          <p>{rankData.wins}&nbsp;wins&nbsp;&nbsp;{rankData.losses}&nbsp;losses</p>
          <br />
        </>
      ))}
    </div>
  )
}