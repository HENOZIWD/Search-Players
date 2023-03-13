import { useState } from 'react';
import { IMatchData, IParticipantData } from '@/lib/search';
import styles from '@/styles/Match.module.css';
import PlayerInfo from './playerInfo';
import MatchInfo from './matchInfo';
import Team from './team';

interface IMatchProps {
  match: IMatchData;
  player: IParticipantData;
}


export default function Match(props: IMatchProps) {

  // const [detailStatus, setDetailStatus] = useState<boolean>(false);

  // const onDetailClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   event.preventDefault();

  //   setDetailStatus(!detailStatus);
  // }

  return (
    <>
    <div className={styles.match}>
      <div className={props.player.win ? styles.win : styles.lose} />
      <MatchInfo data={props.match} />
      <PlayerInfo data={props.player} />
      <Team data={props.match.blueTeamParticipantsInfo} />
      <Team data={props.match.redTeamParticipantsInfo} />
      {/* <button 
        className={styles.detailButton}
        type="button"
        onClick={onDetailClick}
      >
        {detailStatus ? "↑" : "↓"} 
      </button> */}
    </div>
    </>
  );
}