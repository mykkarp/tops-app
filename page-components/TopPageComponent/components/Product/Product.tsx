import IProductProps from './IProduct.props';
import styles from "./Product.module.css";
import cn from 'classnames';
import { Button, Card, Divider, Htag, Ptag, Rating, Tag } from '../../../../components';
import { Review, ReviewForm } from '..';
import { declOfNum, toLocalNum } from '../../../../helpers';
import Image from 'next/image';
import { useState, useRef, forwardRef, ForwardedRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export const Product = motion(forwardRef(({ product, className, ...props }: IProductProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
  const [isReviewsOpen, setIsReviewsOpen] = useState<boolean>(false);
  const reviewFormRef = useRef<HTMLFormElement>(null);
  const scrollToForm = useRef(false);

  const reviewVariants = {
    visible: { opacity: 1, height: 'auto' },
    hidden: { opacity: 0, height: 0 }
  }

  const scrollToFormAndFocus = () => {
    reviewFormRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
    const firstFromInput = reviewFormRef.current?.elements[0] as HTMLElement;
    firstFromInput.focus({ preventScroll: true });
  }

  const scrollToFormHandler = () => {
    if (isReviewsOpen) {
      scrollToFormAndFocus();
    } else {
      scrollToForm.current = true;
      setIsReviewsOpen(true);
    }
  }

  const toggleReviews = () => {
    setIsReviewsOpen(!isReviewsOpen);
  }

  return (
    <div className={cn(styles.wrapper, className)} ref={ref} {...props}>
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
        <legend className={styles.priceTitle}>цена</legend>
        <legend className={styles.creditTitle}>в кредит</legend>
        <legend className={styles.ratingTitle}><button onClick={scrollToFormHandler}>{product.reviewCount} {declOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}</button></legend>
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
          <Button
            appearance='ghost'
            arrow={isReviewsOpen ? 'down' : 'right'}
            onClick={toggleReviews}
          >
            Читать отзывы
          </Button>
        </div>
      </Card>
      <motion.div
        variants={reviewVariants}
        initial={'hidden'}
        animate={isReviewsOpen ? 'visible' : 'hidden'}
        onAnimationComplete={() => {
          if (scrollToForm.current) {
            scrollToFormAndFocus();
            scrollToForm.current = false;
          }
        }}
      >
        <AnimatePresence
          initial={false}
          exitBeforeEnter={true}
        >
          {isReviewsOpen && (
            <Card
              color='blue'
              className={styles.reviews}
            >
              {product.reviews.map((review) => (
                <div key={review._id}>
                  <Review review={review} />
                  <Divider />
                </div>
              ))}
              <ReviewForm ref={reviewFormRef} productId={product._id} />
            </Card>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}))