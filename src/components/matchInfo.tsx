import { IMatchData } from '@/lib/search';
import styles from '@/styles/MatchInfo.module.css';

interface IMatchInfoProps {
  data: IMatchData;
}

export default function MatchInfo(props: IMatchInfoProps) {

  const date = new Date(props.data.gameEndTimestamp);
  
  return (
    <>
    <div className={styles.info}>
      <div>{props.data.gameMode}</div>
      <div>{date.toLocaleDateString()}</div>
      <div>{date.getHours()}시 {date.getMinutes() < 10 ? "0" + date.getMinutes().toString() : date.getMinutes()}분</div>
      <div>{props.data.gameDuration}</div>
    </div>
    </>
  )
}