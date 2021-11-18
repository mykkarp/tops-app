import ICardProps from './ICard.props';
import styles from "./Card.module.css";
import cn from 'classnames';

export function Card({ children, color = 'white', className, ...props }: ICardProps): JSX.Element {
  return (
    <div
      className={cn(className, styles.card, {
        [styles.card_blue]: color === 'blue',
      })}
      {...props}
    >
      {children}
    </div>
  );
}