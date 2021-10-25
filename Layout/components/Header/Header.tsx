import IHeaderProps from './IHeader.props';
import styles from "./Header.module.css";
import cn from 'classnames';

export function Header({ ...props }: IHeaderProps): JSX.Element {
  return (
    <div {...props}>
      Header
    </div>
  );
}