import IDividerProps from './IDivider.props';
import styles from "./Divider.module.css";
import cn from 'classnames';

export function Divider({ className, ...props }: IDividerProps): JSX.Element {
  return (
    <hr className={cn(className, styles.hr)} {...props} />
  );
}