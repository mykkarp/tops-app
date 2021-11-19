import { Htag, Ptag, Tag } from '../../components';
import { TopPageComponentProps } from './TopPageComponent.props';
import styles from './TopPageComponent.module.css';
import { Vacancies, Advantages, Skills } from './components';
import { TopLevelCategory } from '../../interfaces/toppage.interface';

export function TopPageComponent({ page, products, firstCategory }: TopPageComponentProps): JSX.Element {
  return (
    <>
      <header className={styles.header}>
        <Htag tag='h1'>{page.title}</Htag>
        {products && <Tag color='gray' size='m'>{products.length}</Tag>}
        <span>Сортировка</span>
      </header>
      <section>
        {products && products.map((product) => {
          return (
            <div key={product._id}>
              {product.title}
            </div>
          )
        })}
      </section>
      {firstCategory === TopLevelCategory.Courses && page.hh && <Vacancies {...page.hh} category={page.category} />}
      {page.advantages && page.advantages.length > 0 && <Advantages advantages={page.advantages} />}
      {page.seoText && <Ptag size='l' className={styles.seoText}>{page.seoText}</Ptag>}
      <Skills skills={page.tags} />
    </>
  )
}