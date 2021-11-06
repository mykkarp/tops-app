import styles from "./Menu.module.css";
import cn from 'classnames';
import { useAppContext } from '../../../contexts/app.context';

export function Menu(): JSX.Element {
  const { menu, setMenu, firstCategory } = useAppContext();

  return (
    <div>
      <ul>
        {menu.map((menuItem, index) => {
          return (
            <li key={index}>
              {menuItem._id.secondCategory}
            </li>
          )
        })}
      </ul>
    </div>
  );
}