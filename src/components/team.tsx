import { IParticipantData } from '@/lib/search';
import styles from '@/styles/Team.module.css';
import Image from 'next/image';
import Link from 'next/link';

interface ITeamProps {
  data: IParticipantData[];
}

export default function Team(props: ITeamProps) {

  return (
    <ol className={styles.team}>
    {props.data.map((participant) => (
      <li
        key={participant.summonerName}
        className={styles.summoner}
      >
        <Image
          src={`/image/champion/${participant.championName}.png`}
          alt={participant.championName}
          width={20}
          height={20}
          // priority={true}
        />
        <Link
          href={`/search/${participant.summonerName}`}
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          {participant.summonerName}
        </Link>
      </li>
    ))}
    </ol>
  )
}