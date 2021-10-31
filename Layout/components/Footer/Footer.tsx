import IFooterProps from './IFooter.props';
import styles from "./Footer.module.css";
import cn from 'classnames';
import { format } from 'date-fns';

export function Footer({ className, ...props }: IFooterProps): JSX.Element {
  return (
    <footer className={cn(className, styles.footer)} {...props}>
      <div><span className={styles.text}>OwlTop © 2020 - {format(new Date(), 'yyyy')} All rights reserved</span></div>
      <div><a href="#" className={styles.text}>Terms of use</a></div>
      <div><a href="#" className={styles.text}>Privacy Policy</a></div>
    </footer>
  );
}