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
  ranks: IRankData[];
}

interface IPerksData {
  statPerks: {
    defense: number;
    flex: number;
    offense: number;
  }
  styles: {
    primaryStyle: {
      selections: number[];
      style: number;
    }
    subStyle: {
      selections: number[];
      style: number;
    }
  }
}

export interface IParticipantData {
  summonerName: string;
  teamId: number;
  win: boolean;
  kills: number;
  deaths: number;
  assists: number;
  champLevel: number;
  championId: number;
  championName: string;
  goldEarned: number;
  totalDamageDealtToChampions: number;
  totalDamageTaken: number;
  totalMinionsKilled: number;
  visionScore: number;
  visionWardsBoughtInGame: number;
  wardsKilled: number;
  wardsPlaced: number;
  items: number[];
  summonerSpellIds: number[];
  perks: IPerksData;
}

export interface IMatchData {
  matchId: string;
  currentSummonerIndex: number;
  gameDuration: string;
  gameEndTimestamp: number;
  gameMode: string;
  gameType: string;
  participantsInfo: IParticipantData[][];
  queueId: number;
  highestDamageDealt: number;
  highestDamageTaken: number;
}

export async function searchProfile(name: string): Promise<IProfileData | null> {

  const options = {
    headers: {'X-Riot-Token': process.env.API_KEY!}
  }

  const summonerRes = await fetch(
    `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}`,
    options
  );

  if (summonerRes.status !== 200) {
    console.log("Wrong response " + summonerRes.status + " in summoner ");
    return null;
  }
  const summonerData = await summonerRes.json();

  const rankRes = await fetch(
    `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerData.id}`,
    options
  );

  if (rankRes.status !== 200) {
    console.log("Wrond response " + rankRes.status + " in rank ");
    return null;
  }
  const ranksData = await rankRes.json();

  let reducedRanksData = new Array<IRankData>();

  ranksData.map((data: any) => reducedRanksData.push({
    leagueId: data.leagueId,
    queueType: data.queueType,
    tier: data.tier,
    rank: data.rank,
    leaguePoints: data.leaguePoints,
    wins: data.wins,
    losses: data.losses,
  }));

  const profileData: IProfileData = {
    ...summonerData,
    ranks: reducedRanksData,
  };
  
  return profileData;
}

export async function searchMatchIds(puuid: string, start: number, count: number): Promise<string[] | null> {
  
  const options = {
    headers: {'X-Riot-Token': process.env.API_KEY!}
  }

  const matchIdsRes = await fetch(
    `https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=${start}&count=${count}`,
    options
  );

  if (matchIdsRes.status !== 200) {
    console.log("Wrong response " + matchIdsRes.status + " in match list");

    return null;
  }

  const matchListIdsData: string[] = await matchIdsRes.json();

  return matchListIdsData;
}

export async function searchMatchDetail(matchId: string, summonerName: string): Promise<IMatchData | null> {

  const options = {
    headers: {'X-Riot-Token': process.env.API_KEY!}
  }

  const matchDetailRes = await fetch(
    `https://asia.api.riotgames.com/lol/match/v5/matches/${matchId}`,
    options
  );

  if (matchDetailRes.status !== 200) {
    console.log("Wrong response " + matchDetailRes.status + " in match detail");

    return null;
  }

  const matchDetailData = await matchDetailRes.json();

  const blueTeamParticipantsData = new Array<IParticipantData>();
  const redTeamParticipantsData = new Array<IParticipantData>();
  let currentSummonerIndex = 0;
  
  let highestDamageDealt = 0;
  let highestDamageTaken = 0;

  matchDetailData.info.participants.map((participant: any, index: number) => {
    if (participant.summonerName === summonerName) {
      currentSummonerIndex = index;
    }
    if (highestDamageDealt < participant.totalDamageDealtToChampions) {
      highestDamageDealt = participant.totalDamageDealtToChampions;
    }
    if (highestDamageTaken < participant.totalDamageTaken) {
      highestDamageTaken = participant.totalDamageTaken;
    }

    const participantData: IParticipantData = {
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
      totalMinionsKilled: participant.totalMinionsKilled + participant.neutralMinionsKilled,
      visionScore: participant.visionScore,
      visionWardsBoughtInGame: participant.visionWardsBoughtInGame,
      wardsKilled: participant.wardsKilled,
      wardsPlaced: participant.wardsPlaced,
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

    if (participant.teamId === 100) {
      blueTeamParticipantsData.push(participantData);
    }
    else {
      redTeamParticipantsData.push(participantData);
    }
  });

  const gameDuration: number = matchDetailData.info.gameDuration;
  const gameDurationToString = String(Math.floor(gameDuration / 60)) 
    + "분 " 
    + (((gameDuration % 60) < 10) ? 
      ("0" + String(gameDuration % 60)) : (String(gameDuration % 60)))
    + "초";

  const reducedMatchDetail: IMatchData = {
    matchId: matchDetailData.metadata.matchId,
    currentSummonerIndex: currentSummonerIndex,
    gameDuration: gameDurationToString,
    gameEndTimestamp: matchDetailData.info.gameEndTimestamp,
    gameMode: matchDetailData.info.gameMode,
    gameType: matchDetailData.info.gameType,
    participantsInfo: [blueTeamParticipantsData,
                        redTeamParticipantsData],
    queueId: matchDetailData.info.queueId,
    highestDamageDealt: highestDamageDealt,
    highestDamageTaken: highestDamageTaken,
  };

  return reducedMatchDetail;
}