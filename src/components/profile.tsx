import Image from 'next/image';
import styled from 'styled-components';

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

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0.5rem;
`

const ProfileItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`

export default function Profile(props: IProfileProps) {
  
  return (
    <ProfileContainer>
      <ProfileItem>
        <Image
          src={`/image/profileicon/${props.data.profileIconId}.png`}
          alt="err"
          width={150}
          height={150}
        />
        <p>{props.data.name}</p>
        <p>{props.data.summonerLevel}</p>
      </ProfileItem>
      {props.data.rank.map((rankData: IRankData) => (
        <ProfileItem key={rankData.queueType}>
          <p>{rankData.queueType}</p>
          <p>{rankData.tier}&nbsp;{rankData.rank}</p>
          <p>{rankData.leaguePoints}&nbsp;points</p>
          <p>{rankData.wins}&nbsp;wins&nbsp;&nbsp;{rankData.losses}&nbsp;losses</p>
          <br />
        </ProfileItem>
      ))}
    </ProfileContainer>
  )
}