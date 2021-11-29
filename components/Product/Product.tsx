import IProductProps from './IProduct.props';
import styles from "./Product.module.css";
import cn from 'classnames';
import { Button, Card, Htag, Ptag, Rating, Tag } from '..';

export function Product({ product, className, ...props }: IProductProps): JSX.Element {
  return (
    <Card className={styles.product}>
      <div className={styles.logo}><img src={process.env.NEXT_PUBLIC_DOMAIN + product.image} alt={product.title} /></div>
      <div className={styles.title}><Htag tag="h3">{product.title}</Htag></div>
      <div className={styles.price}><span>{product.price}</span></div>
      <div className={styles.credit}><span>{product.credit}</span></div>
      <div className={styles.rating}><Rating rating={product.reviewAvg ?? product.initialRating} /></div>
      <div className={styles.tags}>
        {product.categories.map(category => <Tag key={category} color='ghost'>{category}</Tag>)}
      </div>
      <span className={styles.priceTitle}>цена</span>
      <span className={styles.creditTitle}>в кредит</span>
      <span className={styles.ratingTitle}>{product.reviewCount} отзывов</span>
      <hr className={styles.hr} />
      <Ptag className={styles.description} size='m'>{product.description}</Ptag>
      <div className={styles.features}>features</div>
      <div className={styles.advantages_wrapper}>
        <div className={styles.advantages}>
          <div>Advantages</div>
          <div>{product.advantages}</div>
        </div>
        <div className={styles.advantages}>
          <div>Disadvantages</div>
          <div>{product.disadvantages}</div>
        </div>
      </div>
      <hr className={styles.hr} />
      <div className={styles.actions}>
        <Button appearance='primary'>Узнать подробнее</Button>
        <Button appearance='ghost' arrow='right'>Читать отзывы</Button>
      </div>
    </Card>
  );
}