import IInputProps from './IInput.props';
import styles from "./Input.module.css";
import cn from 'classnames';
import { ForwardedRef, forwardRef } from 'react';

export const Input = forwardRef(({ error, className, ...props }: IInputProps, ref: ForwardedRef<HTMLInputElement>): JSX.Element => {
  return (
    <div className={cn(className, styles.inputWrapper)}>
      <input
        ref={ref}
        className={cn(styles.input, {
          [styles.error]: error
        })}
        type='text'
        {...props}
      />
      {error && (<span role='alert' className={styles.errorMessage}>{error.message}</span>)}
    </div>
  );
});