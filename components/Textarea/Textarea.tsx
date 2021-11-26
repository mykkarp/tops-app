import ITextareaProps from './ITextarea.props';
import styles from "./Textarea.module.css";
import cn from 'classnames';

export function Textarea({ className, ...props }: ITextareaProps): JSX.Element {
  return (
    <textarea
      className={cn(className, styles.textarea)}
      {...props}
    />
  );
}