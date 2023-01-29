import { useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const SearchForm = styled.form`
  display: flex;
  justify-content: center;
  padding: 5px;
  align-self: center;
`

const SearchBox = styled.input`
  width: 500px;
  height: 30px;
  margin: 10px 5px;
  padding: 5px;
  border-radius: 10px;
  border: 1px solid blue;
`

const SearchButton = styled.button`
  width: 80px;
  height: 30px;
  margin: 10px 5px;
  border-radius: 10px;
  border: 1px solid blue;
`

export default function HomeSearch() {

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
      <SearchBox 
        value={summonerName} 
        onChange={searchHandleChange}
      />
      <SearchButton type="submit">search</SearchButton>
    </SearchForm>
  );
}