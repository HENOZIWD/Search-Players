import { IParticipantData } from '@/lib/search';
import Image from 'next/image';
import styles from '@/styles/PlayerInfo.module.css';

interface IPlayerInfoProps {
  data: IParticipantData;
}

export default function PlayerInfo(props: IPlayerInfoProps) {

  return (
    <>
    <div className={styles.info}>
      <Image
        src={`/image/champion/${props.data.championName}.png`}
        alt={props.data.championName}
        width={50}
        height={50}
        priority={true}
      />
      <div className={styles.perk}>
        <Image
          src={`/image/perk/${props.data.perks.styles.primaryStyle.style}/${props.data.perks.styles.primaryStyle.selections[0]}.png`}
          alt={props.data.perks.styles.primaryStyle.selections[0].toString()}
          width={25}
          height={25}
          // priority={true}
        />
        <Image
          src={`/image/perk/${props.data.perks.styles.subStyle.style}.png`}
          alt={props.data.perks.styles.subStyle.style.toString()}
          width={25}
          height={25}
          // priority={true}
        />
      </div>
      <div className={styles.kda}>{props.data.kills} / {props.data.deaths} / {props.data.assists}</div>
      <div className={styles.csGrade}>
        <div className={styles.cs}>cs {props.data.totalMinionsKilled}</div>
        <div className={styles.grade}>
          평점 {((props.data.kills + props.data.assists) / props.data.deaths).toFixed(2)}:1
        </div>
      </div>
      <div className={styles.vision}>
        <div>시야 점수 {props.data.visionScore}</div>
        <div>제어 와드 구매 {props.data.visionWardsBoughtInGame}</div>
        <div>와드 설치 {props.data.wardsPlaced}</div>
        <div>와드 파괴 {props.data.wardsKilled}</div>
      </div>
      <div>
        {props.data.summonerSpellIds.map((spell) => (
          <Image
            key={spell}
            src={`/image/summonerSpell/${spell}.png`}
            alt={spell.toString()}
            width={25}
            height={25}
            // priority={true}
          />
        ))}
      </div>
      <div></div>
      <div className={styles.items}>
        {props.data.items.map((item, index) => (
          <Image
            key={index}
            src={`/image/item/${item}.png`}
            alt={item.toString()}
            width={30}
            height={30}
            // priority={true}
          />
        ))}
      </div>
    </div>
    </>
  )
}