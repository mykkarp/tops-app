import IRatingProps from './IRating.props';
import styles from "./Rating.module.css";
import cn from 'classnames';
import { ForwardedRef, forwardRef, KeyboardEvent, useEffect, useState } from 'react';
import StarIcon from './star.svg';

export const Rating = forwardRef(({ isEditable = false, rating, setRating, className, ...props }: IRatingProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
  const AMOUNT_OF_STARS: number = 5;
  const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(AMOUNT_OF_STARS).fill(<></>));

  const constructRating = (currentRating: number) => {
    const updatedArray = ratingArray.map((_, index: number) => {
      return (
        <button
          type='button'
          className={cn(styles.star, {
            [styles.filled]: index < currentRating,
            [styles.editable]: isEditable,
          })}
          onClick={() => onClickHandler(index + 1)}
          tabIndex={isEditable ? 0 : -1}
          onKeyDown={(event: KeyboardEvent<HTMLSpanElement>) => isEditable && onSpaceHandler(index + 1, event)}
        >
          <StarIcon />
        </button>
      )
    });

    setRatingArray(updatedArray);
  }

  const onSpaceHandler = (rating: number, event: KeyboardEvent<HTMLSpanElement>) => {
    if (event.code !== 'Space' || typeof setRating !== 'function') return;

    setRating(rating);
  }

  const onClickHandler = (rating: number) => {
    if (!isEditable || typeof setRating !== 'function') return;

    setRating(rating);
  }

  useEffect(() => {
    constructRating(rating);
  }, [rating]);

  return (
    <div
      ref={ref}
      className={cn(styles.rating, className)}
      {...props}
    >
      {ratingArray.map((ratingItem: JSX.Element, index: number) => <span key={index}>{ratingItem}</span>)}
    </div>
  );
});