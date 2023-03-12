import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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

  return (
    <>
    <div className={styles.match}>
      <div className={props.player.win ? styles.win : styles.lose} />
      <MatchInfo data={props.match} />
      <PlayerInfo data={props.player} />
      <Team data={props.match.blueTeamParticipantsInfo} />
      <Team data={props.match.redTeamParticipantsInfo} />
    </div>
    </>
  );
}