import { Htag, Tag } from '../../components';
import { TopPageComponentProps } from './TopPageComponent.props';
import styles from './TopPageComponent.module.css';
import { Vacancies } from './Vacancies/Vacancies';
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
      {firstCategory === TopLevelCategory.Courses && <Vacancies {...page.hh} category={page.category} />}
    </>
  )
}