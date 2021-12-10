import IProductProps from './IProduct.props';
import styles from "./Product.module.css";
import cn from 'classnames';
import { Button, Card, Divider, Htag, Ptag, Rating, Tag } from '../../../../components';
import { Review } from '..';
import { declOfNum, toLocalNum } from '../../../../helpers';
import Image from 'next/image';
import { useState } from 'react';

export function Product({ product, className, ...props }: IProductProps): JSX.Element {
  const [isReviewsOpen, setIsReviewsOpen] = useState<boolean>(false);

  const toggleReviews = () => {
    setIsReviewsOpen(!isReviewsOpen);
  }
  return (
    <div className={styles.wrapper} {...props}>
      <Card className={styles.product}>
        <div className={styles.logo}>
          <Image
            src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
            alt={product.title}
            width={70}
            height={70}
          />
        </div>
        <div className={styles.title}><Htag tag="h3">{product.title}</Htag></div>
        <div className={styles.price}>
          {toLocalNum(product.price)} ₽
          {product.oldPrice && <Tag size='s' color='green'>{toLocalNum(product.price - product.oldPrice)} ₽</Tag>}
        </div>
        <div className={styles.credit}>{toLocalNum(product.credit)} ₽<span>/мес</span></div>
        <div className={styles.rating}><Rating rating={product.reviewAvg ?? product.initialRating} /></div>
        <div className={styles.tags}>
          {product.categories.map(category => <Tag key={category} size='s' color='ghost'>{category}</Tag>)}
        </div>
        <span className={styles.priceTitle}>цена</span>
        <span className={styles.creditTitle}>в кредит</span>
        <span className={styles.ratingTitle}>{product.reviewCount} {declOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}</span>
        <Divider className={styles.hr} />
        <Ptag
          className={cn(styles.description, {
            [styles.descriptionResetMargin]: !(product.characteristics || product.advantages || product.disadvantages)
          })}
          size='m'
        >
          {product.description}
        </Ptag>
        <div className={styles.characteristics}>
          {product.characteristics.map(characteristic => (
            <div key={characteristic.name} className={styles.characteristic}>
              <span className={styles.characteristicName}>{characteristic.name}</span>
              <span className={styles.characteristicDots}></span>
              <span className={styles.characteristicValue}>{characteristic.value}</span>
            </div>
          ))}
        </div>
        <div className={styles.merits}>
          {product.advantages && (
            <div className={styles.advantages}>
              <div className={styles.merits_border} />
              <h4 className={styles.merits_title}>Преимущества</h4>
              <Ptag className={styles.merits_description} size='m'>{product.advantages}</Ptag>
            </div>
          )}
          {product.disadvantages && (
            <div className={styles.disadvantages}>
              <div className={styles.merits_border} />
              <h4 className={styles.merits_title}>Недостатки</h4>
              <Ptag className={styles.merits_description} size='m'>{product.disadvantages}</Ptag>
            </div>
          )}
        </div>
        <Divider className={cn(styles.hr, styles.hr2)} />
        <div className={styles.actions}>
          <Button appearance='primary'>Узнать подробнее</Button>
          {product.reviewCount > 0 && (
            <Button
              appearance='ghost'
              arrow={isReviewsOpen ? 'down' : 'right'}
              onClick={toggleReviews}
            >
              Читать отзывы
            </Button>
          )}
        </div>
      </Card>
      <Card color='blue' className={cn(styles.reviews, {
        [styles['reviews-open']]: isReviewsOpen,
      })}>
        {product.reviews.map((review) => <Review key={review._id} review={review} />)}
      </Card>
    </div>
  );
}