import Head from 'next/head'
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '@/components/layout';
import HomeSearch from '@/components/homeSearch';

export default function Home() {

  const [summonerName, setSummonerName] = useState<string>("");
  const router = useRouter();

  const searchHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSummonerName(event.target.value);
  }

  const searchHandleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (summonerName === "") {
      alert("소환사명을 입력하세요.");
    }
    else {
      router.push(`/search/${summonerName}`);
    }
  }

  return (
    <Layout home={true}>
      <Head>
        <title>Search Summoner</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeSearch />
    </Layout>
  );
}