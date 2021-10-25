import IFooterProps from './IFooter.props';
import styles from "./Footer.module.css";
import cn from 'classnames';

export function Footer({ ...props }: IFooterProps): JSX.Element {
  return (
    <div {...props}>
      Footer
    </div>
  );
}