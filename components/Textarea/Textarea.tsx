import ITextareaProps from './ITextarea.props';
import styles from "./Textarea.module.css";
import cn from 'classnames';
import { ForwardedRef, forwardRef } from 'react';

export const Textarea = forwardRef(({ error, className, ...props }: ITextareaProps, ref: ForwardedRef<HTMLTextAreaElement>): JSX.Element => {
  return (
    <div className={cn(className, styles.textareaWrapper)}>
      <textarea
        ref={ref}
        className={cn(styles.textarea, {
          [styles.error]: error
        })}
        {...props}
      />
      {error && (<span role='alert' className={styles.errorMessage}>{error.message}</span>)}
    </div>
  );
})