import type { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { withLayout } from '../../Layout/Layout';
import axios from 'axios';
import { MenuItem } from '../../interfaces/menu.interface';
import { TopLevelCategory, TopPageModel } from '../../interfaces/toppage.interface';
import { ParsedUrlQuery } from 'node:querystring';
import { ProductModel } from '../../interfaces/product.interface';
import { firstLevelMenu } from '../../helpers';
import { TopPageComponent } from '../../page-components';
import { API } from '../../helpers/api';
import Head from 'next/head';
import { Error404 } from '../404';

const TopPage = ({ firstCategory = 0, page, products }: TopPageProps): JSX.Element => {
  if (!page || !products) {
    return <Error404 />
  }

  return (
    <>
      <Head>
        <title>{page.metaTitle}</title>
        <meta name='description' content={page.metaDescription} />
        <meta property='og:title' content={page.metaTitle} />
        <meta property='og:description' content={page.metaDescription} />
        <meta property='og:type' content="article" />
      </Head>
      <TopPageComponent
        products={products}
        firstCategory={firstCategory}
        page={page}
      />
    </>
  );
};

export default withLayout(TopPage);

export const getStaticPaths: GetStaticPaths = async () => {
  let paths: string[] = [];

  for (const menuItem of firstLevelMenu) {
    const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
      firstCategory: menuItem.id
    });
    paths = paths.concat(menu.flatMap(m => m.pages.map(page => `/${menuItem.route}/${page.alias}`)));
  }

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps<TopPageProps> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (!params) {
    return {
      notFound: true
    };
  }

  const firstCategoryItem = firstLevelMenu.find((menuItem) => menuItem.route === params.type);
  if (!firstCategoryItem) {
    return {
      notFound: true
    };
  }

  try {
    const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
      firstCategory: firstCategoryItem.id
    });
    if (menu.length === 0) {
      return {
        notFound: true
      };
    }
    const { data: page } = await axios.get<TopPageModel>(API.topPage.byAlias + params.alias);
    const { data: products } = await axios.post<ProductModel[]>(API.product.find, {
      category: page.category,
      limit: 10
    });

    return {
      props: {
        menu,
        firstCategory: firstCategoryItem.id,
        page,
        products
      }
    };
  } catch {
    return {
      notFound: true
    };
  }
};

interface TopPageProps {
  menu: MenuItem[];
  firstCategory: TopLevelCategory;
  page: TopPageModel;
  products: ProductModel[];
}