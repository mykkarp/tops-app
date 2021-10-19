import ITagProps from './Tag.props';
import styles from "./Tag.module.css";
import cn from 'classnames';

export function Tag({ color = 'ghost', size = 'm', href = '', children, className, ...props }: ITagProps): JSX.Element {
  return (
    <div
      className={cn(styles.tag, className, {
        [styles.s]: size === 's',
        [styles.m]: size === 'm',
        [styles.ghost]: color === 'ghost',
        [styles.red]: color === 'red',
        [styles.green]: color === 'green',
        [styles.gray]: color === 'gray',
        [styles.primary]: color === 'primary',
      })}
      {...props}
    >
      {href ? (
        <a href={href}>
          {children}
        </a>
      ) : (
        <span>
          {children}
        </span>
      )}
    </div>
  );
}