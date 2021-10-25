import IButtonProps from './IButton.props';
import styles from "./Button.module.css";
import cn from 'classnames';
import ArrowIcon from './arrow.svg';

export function Button({ appearance, arrow = 'none', children, className, ...props }: IButtonProps): JSX.Element {
  return (
    <button
      className={cn(styles.button, className, {
        [styles.primary]: appearance === 'primary',
        [styles.ghost]: appearance === 'ghost',
      })}
      {...props}
    >
      {children}
      {arrow !== 'none' && (
        <span className={cn(styles.arrow, {
          [styles['arrow-down']]: arrow === 'down',
        })}>
          <ArrowIcon />
        </span>
      )}
    </button>
  );
}