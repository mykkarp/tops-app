import IAdvantagesProps from './IAdvantages.props';
import styles from "./Advantages.module.css";
import { Htag, Ptag } from '../../../../components';
import CheckIcon from './check.svg';

export function Advantages({ advantages }: IAdvantagesProps): JSX.Element {
  return (
    <section className={styles.wrapper}>
      <header className={styles.header}>
        <Htag tag="h2">Преимущества</Htag>
      </header>
      <div className={styles.advantages}>
        {advantages.map(({ title, description, _id }) => {
          return (
            <div key={_id} className={styles.advantage}>
              <CheckIcon />
              <Htag tag="h3">{title}</Htag>
              {description && (
                <>
                  <hr />
                  <Ptag size='l'>{description}</Ptag>
                </>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}