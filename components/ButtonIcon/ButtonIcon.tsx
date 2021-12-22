import IButtonIconProps, { icons } from './IButtonIcon.props';
import styles from "./ButtonIcon.module.css";
import cn from 'classnames';

export function ButtonIcon({ appearance, icon, className, ...props }: IButtonIconProps): JSX.Element {
  const IconComp = icons[icon];

  return (
    <button
      className={cn(styles.button, className, {
        [styles.primary]: appearance === 'primary',
        [styles.ghost]: appearance === 'white',
      })}
      {...props}
    >
      <IconComp />
    </button>
  );
}