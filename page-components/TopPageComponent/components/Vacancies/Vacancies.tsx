import IVacanciesProps from './IVacancies.props';
import styles from "./Vacancies.module.css";
import StarIcon from './star.svg';
import { Card, Htag, Tag } from '../../../../components';
import { toLocalNum } from '../../../../helpers';

export function Vacancies({ count, category, juniorSalary, middleSalary, seniorSalary }: IVacanciesProps): JSX.Element {
  return (
    <section className={styles.wrapper}>
      <header className={styles.header}>
        <Htag tag='h2'>Вакансии - {category}</Htag>
        <Tag color='red' size='m'>hh.ru</Tag>
      </header>
      <div className={styles.body}>
        <Card className={styles.count}>
          <span className={styles.title}>Всего вакансий</span>
          <span className={styles.countValue}>{toLocalNum(count)}</span>
        </Card>
        <Card className={styles.salary}>
          <div>
            <span className={styles.title}>Начальный</span>
            <span className={styles.salaryValue}>{toLocalNum(juniorSalary)} ₽</span>
            <div className={styles.rating}>
              <StarIcon className={styles.filled} />
              <StarIcon />
              <StarIcon />
            </div>
          </div>
          <div>
            <span className={styles.title}>Средний</span>
            <span className={styles.salaryValue}>{toLocalNum(middleSalary)} ₽</span>
            <div className={styles.rating}>
              <StarIcon className={styles.filled} />
              <StarIcon className={styles.filled} />
              <StarIcon />
            </div>
          </div>
          <div>
            <span className={styles.title}>Профессионал</span>
            <span className={styles.salaryValue}>{toLocalNum(seniorSalary)} ₽</span>
            <div className={styles.rating}>
              <StarIcon className={styles.filled} />
              <StarIcon className={styles.filled} />
              <StarIcon className={styles.filled} />
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}