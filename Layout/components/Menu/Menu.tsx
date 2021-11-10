import styles from "./Menu.module.css";
import cn from 'classnames';
import { useAppContext } from '../../../contexts/app.context';
import { PageItem } from '../../../interfaces/menu.interface';
import ArrowIcon from './Icons/arrow.svg';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { firstLevelMenu } from '../../../helpers';

export function Menu(): JSX.Element {
  const { menu, setMenu, firstCategory } = useAppContext();
  const router = useRouter();

  const toggleSecondLevel = (secondCategory: string) => {
    setMenu && setMenu(menu.map((menuItem) => {
      if (menuItem._id.secondCategory === secondCategory) {
        menuItem.isOpen = !menuItem.isOpen;
      }
      return menuItem
    }));
  }

  const buildFirstLevel = () => {
    return (
      <ul className={cn(styles.firstLevelList)}>
        {firstLevelMenu.map((menu) => {
          return (
            <li key={menu.route} className={cn(styles.firstLevelLI, {
              [styles.firstLevelActive]: menu.id === firstCategory,
            })}>
              <Link href={`/${menu.route}`}>
                <a>
                  {menu.icon}
                  {menu.name}
                </a>
              </Link>
              {menu.id === firstCategory && buildSecondLevel(menu.route)}
            </li>
          )
        })}
      </ul>
    )
  }

  const buildSecondLevel = (route: string) => {
    return (
      <div className={styles.secondLevelBlock}>
        <div>
          <svg
            width="100%"
            height="100%"
          >
            <line x1="12" y1="0" x2="12" y2="100%" stroke="#DFDFDF" />
          </svg>
        </div>
        <ul className={styles.secondLevelList}>
          {menu.map((menuItem) => {
            const isMenuItemRouted = menuItem.pages.map((page) => page.alias).includes(router.asPath.split('/')[2]);

            if (isMenuItemRouted) {
              menuItem.isOpen = true;
            }

            return (
              <li key={menuItem._id.secondCategory} className={cn(styles.secondLevelLI, {
                [styles.secondLevelLIOpen]: menuItem.isOpen,
              })}>
                <button onClick={() => toggleSecondLevel(menuItem._id.secondCategory)}>
                  {menuItem._id.secondCategory}
                  <span className={styles.arrow}>
                    <ArrowIcon />
                  </span>
                </button>
                {menuItem.isOpen && buildThirdLevel(menuItem.pages, route)}
              </li>
            )
          })
          }
        </ul >
      </div>
    )
  }

  const buildThirdLevel = (pages: PageItem[], route: string) => {
    return (
      <ul className={cn(styles.thirdLevelList)}>
        {pages.map((page) => {
          return (
            <li key={page.alias} className={cn(styles.thirdLevelLI, {
              [styles.thirdLevelCurrentCategory]: `/${route}/${page.alias}` === router.asPath
            })}>
              <Link href={`/${route}/${page.alias}`}><a>{page.category}</a></Link>
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <div className={styles.menu}>
      {buildFirstLevel()}
    </div>
  );
}