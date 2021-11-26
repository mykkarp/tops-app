import IInputProps from './IInput.props';
import styles from "./Input.module.css";
import cn from 'classnames';

export function Input({ className, ...props }: IInputProps): JSX.Element {
  return (
    <input
      className={cn(className, styles.input)}
      type='text'
      {...props}
    />
  );
}