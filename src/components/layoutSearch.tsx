import { useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const SearchForm = styled.form`
  display: flex;
  padding: 5px;
`

export default function LayoutSearch() {

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
    <SearchForm onSubmit={searchHandleSubmit}>
      <input 
        value={summonerName} 
        onChange={searchHandleChange}
      />
      <button type="submit">search</button>
    </SearchForm>
  );
}