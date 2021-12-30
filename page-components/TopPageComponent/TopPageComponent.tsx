import { Htag, Tag } from '../../components';
import { TopPageComponentProps } from './TopPageComponent.props';
import styles from './TopPageComponent.module.css';
import { Vacancies, Advantages, Skills, SeoText, Sort, Product } from './components';
import { TopLevelCategory } from '../../interfaces/toppage.interface';
import { SortEnum, sortActionTypes, updateProductsAction } from './components/Sort/sort.actions';
import { sortReducer } from './components/Sort/sort.reducer';
import { useEffect, useReducer } from 'react';

export function TopPageComponent({ page, products, firstCategory }: TopPageComponentProps): JSX.Element {
  const [{ products: sortedProducts, sort }, dispatchSort] = useReducer(sortReducer, { products, sort: SortEnum.Rating });

  const setSort = (action: sortActionTypes) => {
    dispatchSort(action);
  }

  useEffect(() => {
    dispatchSort(updateProductsAction(products));
  }, [products]);

  return (
    <>
      <header className={styles.header}>
        <Htag tag='h1'>{page.title}</Htag>
        {products && <Tag color='gray' size='m' aria-label={`${products.length} элементов`}>{products.length}</Tag>}
        <Sort sort={sort} setSort={setSort} />
      </header>
      <section>
        {sortedProducts && sortedProducts.map((product) => <Product layout key={product._id} product={product} />)}
      </section>
      {firstCategory === TopLevelCategory.Courses && page.hh && <Vacancies {...page.hh} category={page.category} />}
      {page.advantages && page.advantages.length > 0 && page.advantages[0].title.length !== 0 && <Advantages advantages={page.advantages} />}
      {page.seoText && <SeoText seoHTML={page.seoText} />}
      <Skills skills={page.tags} />
    </>
  )
}