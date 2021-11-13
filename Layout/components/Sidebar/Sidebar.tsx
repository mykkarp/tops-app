import ISidebarProps from './ISidebar.props';
import styles from "./Sidebar.module.css";
import cn from 'classnames';
import { Menu } from '../Menu/Menu';
import Logo from '../../logo.svg';

export function Sidebar({ className, ...props }: ISidebarProps): JSX.Element {
  return (
    <aside className={cn(className, styles.sidebar)} {...props}>
      <Logo className={styles.logo} />
      <div>Поиск</div>
      <Menu />
    </aside>
  );
}