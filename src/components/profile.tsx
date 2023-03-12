import Image from 'next/image';
import { IProfileData, IRankData } from '@/lib/search';
import styles from '@/styles/Profile.module.css';

interface IProfileProps {
  data: IProfileData;
}

export default function Profile(props: IProfileProps) {
  
  return (
    <>
    <div className={styles.profile}>
      <div className={styles.summoner}>
        <Image
          src={`/image/profileicon/${props.data.profileIconId}.png`}
          alt={props.data.profileIconId.toString()}
          width={150}
          height={150}
        />
        <div>Lv. {props.data.summonerLevel}</div>
        <div>{props.data.name}</div>
      </div>
      {props.data.ranks.map((rank) => (
        <div 
        key={rank.queueType}
        className={styles.rank}
      >
        <div>{rank.queueType}</div>
        <div>{rank.tier} {rank.rank}</div>
        <div>{rank.leaguePoints} LP</div>
        <div>{rank.wins}승 {rank.losses}패</div>
      </div>
      ))}
    </div>
    </>
  )
}