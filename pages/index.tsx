import type { NextPage } from 'next';
import { Htag, Button } from '../components';

const Home: NextPage = () => {
  return (
    <div>
      <Htag tag="h1">Tag</Htag>
      <Htag tag="h2">Tag</Htag>
      <Htag tag="h3">Tag</Htag>
      <Button appearance="primary" arrow='right'>Узнать подробнее</Button>
      <Button appearance="ghost" arrow='right'>Узнать подробнее</Button>
    </div>
  )
}

export default Home;
