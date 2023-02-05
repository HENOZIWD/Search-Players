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
  position: relative;
`

const LevelBox = styled.div`
  display: flex;
  background-color: #1d1d1d;
  color: #ffffff;
  align-self: center;
  padding: 0.1rem 0.3rem;
  border-radius: 0.5rem;
  border: 0.11rem solid white;
  position: absolute;
  bottom: 0;
  margin-bottom: 2.4rem;
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
          style={{ borderRadius: '1.5rem', border: '2px solid black'}}
        />
        <LevelBox>{props.data.summonerLevel}</LevelBox>
        <p style={{ marginTop: '0.6rem' }}>{props.data.name}</p>
      </ProfileItem>
      {props.data.rank.map((rankData: IRankData) => (
        <ProfileItem key={rankData.queueType}>
          <p>{rankData.queueType === "RANKED_SOLO_5x5" ? "솔로 랭크" :
              rankData.queueType === "RANKED_FLEX_SR" ? "자유 랭크" :
              rankData.queueType === "RANKED_TFT_DOUBLE_UP" ? "전략적 팀 전투" :
              rankData.queueType}</p>
          <p>{rankData.tier}&nbsp;{rankData.rank}</p>
          <p>{rankData.leaguePoints}&nbsp;LP</p>
          <p>{rankData.wins}승&nbsp;{rankData.losses}패&nbsp;&#40;{Math.round(rankData.wins*100/(rankData.wins+rankData.losses))}&#37;&#41;</p>
          <br />
        </ProfileItem>
      ))}
    </ProfileContainer>
  )
}