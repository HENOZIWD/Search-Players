import { IMatchData, IParticipantData } from '@/lib/search';
import Match from './match';
import styles from '@/styles/MatchList.module.css';

interface IMatchListProps {
  data: IMatchData[];
}

export default function MatchList(props: IMatchListProps) {

  return (
    <>
    <ol className={styles.matchList}>
      {props.data.map((match) => {
        const player = match.playerTeam === "blue" ?
          match.blueTeamParticipantsInfo[match.playerIndex] :
          match.redTeamParticipantsInfo[match.playerIndex];

        return (
          <li key={match.matchId}>
            <Match 
              match={match}
              player={player}
            />
          </li>
        )
      })}
    </ol>
    </>
  )
}