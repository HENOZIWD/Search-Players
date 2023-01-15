import Layout from "@/components/layout";
import { InferGetServerSidePropsType } from "next";
import Head from "next/head";

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

    const data = {
      summonerData: summonerData,
      rankData: rankData,
    };

    console.log(data);
    
    return { props: { data } };
}

export default function Summoner({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    
    return (
      <Layout>
        <Head>
          <title>Search Summoner</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        ##Summoner
        <br />
        {/* <p>id: {data?.summonerData.id}</p>
        <p>accountId: {data?.summonerData.accountId}</p>
        <p>puuid: {data?.summonerData.puuid}</p> */}
        <p>name: {data?.summonerData.name}</p>
        <p>profileIconId: {data?.summonerData.profileIconId}</p>
        {/* <p>revisionDate: {data?.summonerData.revisionDate}</p> */}
        <p>summonerLevel: {data?.summonerData.summonerLevel}</p>
        <br />
        ##Rank
        <br />
        {data?.rankData && data.rankData.map((
          {summonerId, queueType, tier, rank, leaguePoints, wins, losses}: {
            summonerId: string,
            queueType: string,
            tier: string,
            rank: string
            leaguePoints: number,
            wins: number,
            losses: number
          }) => (
            <div key={queueType}>
              <p>queueType: {queueType}</p>
              <p>tier: {tier}&nbsp;{rank}</p>
              <p>leaguePoints: {leaguePoints}</p>
              <p>wins: {wins}</p>
              <p>losses: {losses}</p>
              <br />
            </div>
          ))}
      </Layout>
    );
}