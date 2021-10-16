import type { NextPage } from 'next';
import { Htag } from '../components';

const Home: NextPage = () => {
  return (
    <div>
      <Htag tag="h1">Tag</Htag>
      <Htag tag="h2">Tag</Htag>
      <Htag tag="h3">Tag</Htag>
    </div>
  )
}

export default Home;
