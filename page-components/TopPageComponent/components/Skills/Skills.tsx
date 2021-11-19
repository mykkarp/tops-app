import ISkillsProps from './ISkills.props';
import styles from "./Skills.module.css";
import { Htag, Tag } from '../../../../components';

export function Skills({ skills }: ISkillsProps): JSX.Element {
  return (
    <section className={styles.wrapper}>
      <Htag tag='h3'>Получаемые навыки</Htag>
      <div className={styles.tags}>
        {skills.map((skill) => {
          return (
            <Tag key={skill} color='primary'>
              {skill}
            </Tag>
          )
        })}
      </div>
    </section>
  );
}
