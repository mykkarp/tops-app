import IReviewProps from './IReview.props';
import styles from "./Review.module.css";
import cn from 'classnames';
import UserIcon from './User.svg';
import format from 'date-fns/format';
import ru from 'date-fns/locale/ru';
import { Ptag, Rating } from '../../../../components';

export function Review({ review, className, ...props }: IReviewProps): JSX.Element {
  const { name, title, description, createdAt, rating } = review;

  return (
    <article
      className={cn(className, styles.review)}
      {...props}
    >
      <div><UserIcon /></div>
      <div className={styles.title}>
        <span className={styles.userName}>{name}:&nbsp;&nbsp;</span>
        <span>{title}</span>
      </div>
      <span className={styles.createdAt}>{format(new Date(createdAt), 'dd MMMM yyyy', { locale: ru })}</span>
      <div><Rating rating={rating} /></div>
      <Ptag size='s' className={styles.description}>{description}</Ptag>
    </article>
  );
}