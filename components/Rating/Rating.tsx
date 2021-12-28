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
        <label>
          <input
            type='radio'
            onClick={() => onClickHandler(index + 1)}
            tabIndex={isEditable ? 0 : -1}
          />
          <StarIcon
            className={cn(styles.star, {
              [styles.filled]: index < currentRating,
              [styles.editable]: isEditable,
            })}
          />
        </label>
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
      {ratingArray.map((ratingItem: JSX.Element, index: number) => <span key={index}>{ratingItem}</span>)}
      {error && <span className={styles.errorMessage}>{error.message}</span>}
    </fieldset>
  );
});