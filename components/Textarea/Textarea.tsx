import ITextareaProps from './ITextarea.props';
import styles from "./Textarea.module.css";
import cn from 'classnames';
import { ForwardedRef, forwardRef } from 'react';

export const Textarea = forwardRef(({ className, ...props }: ITextareaProps, ref: ForwardedRef<HTMLTextAreaElement>): JSX.Element => {
  return (
    <textarea
      ref={ref}
      className={cn(className, styles.textarea)}
      {...props}
    />
  );
})