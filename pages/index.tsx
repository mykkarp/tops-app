import type { GetStaticProps } from 'next';
import { useState } from 'react';
import { Htag, Button, Ptag, Tag, Rating } from '../components';
import { withLayout } from '../Layout/Layout';
import axios from 'axios';
import { MenuItem } from '../interfaces/menu.interface';

const Home = ({ menu, firstCategory }: HomeProps): JSX.Element => {
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
      <ul>
        {menu.map((menuItem, index) => {
          return (
            <li key={index}>
              {menuItem._id.secondCategory}
            </li>
          )
        })}
      </ul>
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