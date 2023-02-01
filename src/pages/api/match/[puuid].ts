import { NextApiRequest, NextApiResponse } from "next";
import { IMatchData } from "@/pages/search/[name]";
import { IReducedMatchData, IParticipantsInfoData } from "@/components/match";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  const options = {
    headers: {'X-Riot-Token': process.env.API_KEY!}
  }

  const matchListIdRes = await fetch(
    `https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${req.query.puuid}/ids?start=${req.query.start}&count=10`,
    options
  );

  const matchListIdData = await matchListIdRes.json();

  const matchListFullData: IMatchData[] = await Promise.all(
    matchListIdData.map(async (matchId: string): Promise<IMatchData> => {
      const matchDataRes = await fetch(
        `https://asia.api.riotgames.com/lol/match/v5/matches/${matchId}`,
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
      if (req.query.name === participant.summonerName) {
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

  res.status(200).json(matchListData);
}