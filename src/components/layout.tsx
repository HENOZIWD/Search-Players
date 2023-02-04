import Link from 'next/link';
import styled from 'styled-components';
import LayoutSearch from './layoutSearch';

const HeaderLayout = styled.div`
  /* width: 100vw; */
  height: 80px;
  display: flex;
  flex-direction: row;
  padding: 1rem;
`

const Foo = styled.div`
  flex: 1;
`

export default function Layout({ children, home }: { children: React.ReactNode, home?: boolean }) {

  // LayoutSearch = 

  return (
    <>
      <HeaderLayout>
        <Link href="/">Home</Link>
        <Foo />
        {home ? null : <LayoutSearch />}
      </HeaderLayout>
      {children}
    </>
  );
}