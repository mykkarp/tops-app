import type { NextPage } from 'next';
import { Htag, Button, Ptag } from '../components';

const Home: NextPage = () => {
  return (
    <div>
      <Htag tag="h1">Tag</Htag>
      <Htag tag="h2">Tag</Htag>
      <Htag tag="h3">Tag</Htag>
      <Button appearance="primary" arrow='right'>Узнать подробнее</Button>
      <Button appearance="ghost" arrow='right'>Узнать подробнее</Button>
      <Ptag size="l">some text</Ptag>
      <Ptag>some text</Ptag>
      <Ptag size="s">some text</Ptag>
    </div>
  )
}

export default Home;
