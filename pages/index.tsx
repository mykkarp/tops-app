import type { GetStaticProps } from 'next';
import { useState } from 'react';
import { Htag, Button, Ptag, Tag, Rating, Input, Textarea, Search } from '../components';
import { withLayout } from '../Layout/Layout';
import axios from 'axios';
import { MenuItem } from '../interfaces/menu.interface';

const Home = ({ menu, firstCategory }: HomeProps): JSX.Element => {
  const [rating, setRating] = useState<number>(2);

  return (
    <>
      <Htag tag="h1">Тэг</Htag>
      <Button appearance="primary">Узнать подробнее</Button>
      <Ptag size="s">Текст</Ptag>
      <Tag href="#" size='m' color='ghost'>Тест</Tag>
      <Tag href="#" size='m' color='gray'>Тест</Tag>
      <Tag href="#" size='m' color='green'>Тест</Tag>
      <Tag href="#" size='m' color='primary'>Тест</Tag>
      <Tag href="#" size='m' color='red'>Тест</Tag>
      <Rating rating={rating} isEditable setRating={setRating} />
      <div><Input placeholder="test" /></div>
      <Textarea placeholder="test" />
    </>
  )
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
    firstCategory
  });
  return {
    props: {
      menu,
      firstCategory
    }
  }
}

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}