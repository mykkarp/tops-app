import ITopbarProps from './ITopbar.props';
import styles from "./Topbar.module.css";
import cn from 'classnames';

export function Topbar({ ...props }: ITopbarProps): JSX.Element {
  return (
    <nav {...props}>
      Topbar
    </nav>
  );
}