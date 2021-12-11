import IInputProps from './IInput.props';
import styles from "./Input.module.css";
import cn from 'classnames';
import { ForwardedRef, forwardRef } from 'react';

export const Input = forwardRef(({ className, ...props }: IInputProps, ref: ForwardedRef<HTMLInputElement>): JSX.Element => {
  return (
    <input
      ref={ref}
      className={cn(className, styles.input)}
      type='text'
      {...props}
    />
  );
})