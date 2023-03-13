import Link from 'next/link';
import styles from '@/styles/Layout.module.css';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Layout({ children }: { children: React.ReactNode }) {

  const [summonerName, setSummonerName] = useState<string>("");
  const router = useRouter();

  const searchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSummonerName(event.target.value);
  }

  const searchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (summonerName === "") {
      alert("소환사명을 입력하세요.");
    }
    else {
      router.push(`/search/${summonerName}`);
    }
  }

  return (
    <>
    <div className={styles.header}>
      <Link
        href="/"
      >
        Search Summoner
      </Link>
      <form 
        className={styles.searchForm}
        onSubmit={searchSubmit}>
        <input 
          className={styles.searchInput}
          type="search"
          value={summonerName}
          onChange={searchChange}
        />
        <input 
          className={styles.searchSubmit}
          type="submit" 
          value="Search"
        />
      </form>
    </div>
    {children}
    </>
  )
}