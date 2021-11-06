import ISidebarProps from './ISidebar.props';
import styles from "./Sidebar.module.css";
import cn from 'classnames';
import { Menu } from '../Menu/Menu';

export function Sidebar({ ...props }: ISidebarProps): JSX.Element {
  return (
    <aside {...props}>
      <Menu />
    </aside>
  );
}