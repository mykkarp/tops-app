import ISidebarProps from './ISidebar.props';
import styles from "./Sidebar.module.css";
import cn from 'classnames';

export function Sidebar({ ...props }: ISidebarProps): JSX.Element {
  return (
    <div {...props}>
      Sidebar
    </div>
  );
}