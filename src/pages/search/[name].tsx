import Layout from '@/components/layout';
import { InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import MatchList from '@/components/matchList';
import { IParticipantsInfoData, IReducedMatchData } from '@/components/match';
import Profile, { IProfileData, IRankData } from '@/components/profile';

interface IMatchData {
  metadata: any;
  info: any;
}

interface ISummonerName {
    params: {name: string};
}

export async function getServerSideProps({ params }: ISummonerName) {

    const options = {
      headers: {'X-Riot-Token': process.env.API_KEY!}
    }

    const summonerRes = await fetch(
      `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURI(params.name)}`,
      options
    );

    if (summonerRes.status !== 200) {
      const errData = null;
      return {
        props: { errData }
      };
    }
  
    const summonerData = await summonerRes.json();

    const rankRes = await fetch(
      `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${encodeURI(summonerData.id)}`,
      options
    );

    const rankData = await rankRes.json();

    let reducedRankData = new Array<IRankData>();

    rankData.map((fullData: any) => {
      const rData: IRankData = {
        leagueId: fullData.leagueId,
        queueType: fullData.queueType,
        tier: fullData.tier,
        rank: fullData.rank,
        leaguePoints: fullData.leaguePoints,
        wins: fullData.wins,
        losses: fullData.losses,
      };

      reducedRankData.push(rData);
    });

    const profileData: IProfileData = {
      ...summonerData,
      rank: reducedRankData,
    };

    const matchListIdRes = await fetch(
      `https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${encodeURI(summonerData.puuid)}/ids?start=0&count=10`,
      options
    );

    if (matchListIdRes.status !== 200) {
      alert(matchListIdRes.status);
      console.log(matchListIdRes.status);

      const errData = null;
      return {
        props: { errData }
      };
    }

    const matchListIdData = await matchListIdRes.json();

    const matchListFullData: IMatchData[] = await Promise.all(
      matchListIdData.map(async (matchId: string): Promise<IMatchData> => {
        const matchDataRes = await fetch(
          `https://asia.api.riotgames.com/lol/match/v5/matches/${encodeURI(matchId)}`,
          options
        );

        const matchListData = await matchDataRes.json();

        return matchListData;
      })
    )

    // console.log(matchListFullData);

    let matchListData = new Array<IReducedMatchData>();

    matchListFullData.map((match: IMatchData) => {
      let participantsData = new Array<IParticipantsInfoData>();
      let currentSummonerIndex = 0;

      match.info.participants.map((participant: any) => {
        if (summonerData.name === participant.summonerName) {
          currentSummonerIndex = participant.participantId - 1;
        }

        const pInfoData: IParticipantsInfoData = {
          summonerName: participant.summonerName,
          teamId: participant.teamId,
          win: participant.win,
          kills: participant.kills,
          deaths: participant.deaths,
          assists: participant.assists,
          champLevel: participant.champLevel,
          championId: participant.championId,
          championName: participant.championName,
          goldEarned: participant.goldEarned,
          totalDamageDealtToChampions: participant.totalDamageDealtToChampions,
          totalDamageTaken: participant.totalDamageTaken,
          totalMinionsKilled: participant.totalMinionsKilled,
          visionScore: participant.visionScore,
          visionWardsBoughtInGame: participant.visionWardsBoughtInGame,
          items: [participant.item0,
                  participant.item1,
                  participant.item2,
                  participant.item3,
                  participant.item4,
                  participant.item5,
                  participant.item6],
          summonerSpellIds: [participant.summoner1Id,
                             participant.summoner2Id],
          perks: {
            statPerks: {
              defense: participant.perks.statPerks.defense,
              flex: participant.perks.statPerks.flex,
              offense: participant.perks.statPerks.offense
            },
            styles: {
              primaryStyle: {
                selections: [participant.perks.styles[0].selections[0].perk,
                             participant.perks.styles[0].selections[1].perk,
                             participant.perks.styles[0].selections[2].perk,
                             participant.perks.styles[0].selections[3].perk],
                style: participant.perks.styles[0].style
              },
              subStyle: {
                selections: [participant.perks.styles[1].selections[0].perk,
                             participant.perks.styles[1].selections[1].perk,],
                style: participant.perks.styles[1].style
              }
            },
          }
        }

        // console.log(pInfoData);

        participantsData.push(pInfoData);
      })

      const gameDuration: number = match.info.gameDuration;
      const gameDurationToString: string = String(Math.floor(gameDuration / 60)) 
        + ":" 
        + (((gameDuration % 60) < 10) ? 
          ("0" + String(gameDuration % 60)) : (String(gameDuration % 60))
      );

      // const gameEndDate = new Date(match.info.gameEndTimestamp);

      const matchData: IReducedMatchData = {
        matchId: match.metadata.matchId,
        currentSummonerIndex: currentSummonerIndex,
        gameDuration: gameDurationToString,
        gameEndTimestamp: match.info.gameEndTimestamp,
        gameMode: match.info.gameMode,
        gameType: match.info.gameType,
        participantsInfo: participantsData,
      }

      matchListData.push(matchData);
    });

    const data = {
      profileData: profileData,
      matchListData: matchListData,
    };

    
    return { props: { data } };
}

export default function Summoner({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    
  const titleMessage = `${data?.profileData.name} - Search Summoner`

  return (
    <Layout>
      <Head>
        <title>{titleMessage}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {data?.profileData && <Profile data={data.profileData}/>}
      {data?.matchListData && <MatchList data={data.matchListData}/>}
    </Layout>
  );
}