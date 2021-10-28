import type { NextPage } from 'next';
import { useState } from 'react';
import { Htag, Button, Ptag, Tag, Rating } from '../components';
import { withLayout } from '../Layout/Layout';

const Home: NextPage = () => {
  const [rating, setRating] = useState<number>(2);

  return (
    <>
      <Htag tag="h1">Tag</Htag>
      <Htag tag="h2">Tag</Htag>
      <Htag tag="h3">Tag</Htag>
      <Button appearance="primary">Узнать подробнее</Button>
      <Button appearance="ghost" arrow='right'>Узнать подробнее</Button>
      <Ptag size="l">some text</Ptag>
      <Ptag>some text</Ptag>
      <Ptag size="s">some text</Ptag>
      <Tag href="#" size='m' color='ghost'>Test</Tag>
      <Tag href="#" size='m' color='gray'>Test</Tag>
      <Tag href="#" size='m' color='green'>Test</Tag>
      <Tag href="#" size='m' color='primary'>Test</Tag>
      <Tag href="#" size='m' color='red'>Test</Tag>
      <Rating rating={rating} isEditable setRating={setRating} />
    </>
  )
}

export default withLayout(Home);