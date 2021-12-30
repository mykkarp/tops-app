import IRatingProps from './IRating.props';
import styles from "./Rating.module.css";
import cn from 'classnames';
import { ForwardedRef, forwardRef, KeyboardEvent, useEffect, useState } from 'react';
import StarIcon from './star.svg';

export const Rating = forwardRef(({ error, isEditable = false, rating, setRating, className, ...props }: IRatingProps, ref: ForwardedRef<HTMLFieldSetElement>): JSX.Element => {
  const AMOUNT_OF_STARS: number = 5;
  const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(AMOUNT_OF_STARS).fill(<></>));

  const onClickHandler = (rating: number) => {
    if (!isEditable || typeof setRating !== 'function') return;
    setRating(rating);
  }

  const constructRating = (currentRating: number) => {
    const updatedArray = ratingArray.map((_, index: number) => {
      return (
        <>
          <input
            type='radio'
            onClick={() => onClickHandler(index + 1)}
            disabled={!isEditable}
            name='rating'
            role={isEditable ? 'slider' : ''}
            aria-valuenow={rating}
            aria-valuemin={1}
            aria-valuemax={5}
            aria-label={isEditable ? 'укажите рейтинг' : `рейтинг ${rating}`}
            aria-invalid={!!error}
          />
          <StarIcon
            className={cn(styles.star, {
              [styles.filled]: index < currentRating,
              [styles.editable]: isEditable,
            })}
          />
        </>
      )
    });
    setRatingArray(updatedArray);
  }

  useEffect(() => {
    constructRating(rating);
  }, [rating]);

  return (
    <fieldset
      ref={ref}
      className={cn(styles.rating, className, {
        [styles.error]: error
      })}
      {...props}
    >
      {ratingArray.map((ratingItem: JSX.Element, index: number) => <label key={index}>{ratingItem}</label>)}
      {error && <span role='alert' className={styles.errorMessage}>{error.message}</span>}
    </fieldset>
  );
});