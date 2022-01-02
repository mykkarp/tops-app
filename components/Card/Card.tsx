import ICardProps from './ICard.props';
import styles from "./Card.module.css";
import cn from 'classnames';
import { ForwardedRef, forwardRef } from 'react';

export const Card = forwardRef(({ children, color = 'white', className, ...props }: ICardProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
  return (
    <div
      ref={ref}
      className={cn(className, styles.card, {
        [styles.card_blue]: color === 'blue',
      })}
      {...props}
    >
      {children}
    </div>
  );
});