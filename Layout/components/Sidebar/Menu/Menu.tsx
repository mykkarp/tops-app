import styles from "./Menu.module.css";
import cn from 'classnames';
import ArrowIcon from './Icons/arrow.svg';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAppContext } from '../../../../contexts/app.context';
import { firstLevelMenu } from '../../../../helpers';
import { PageItem } from '../../../../interfaces/menu.interface';
import { useEffect } from 'react';

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
        {firstLevelMenu.map((firstLevelMenu) => {
          console.log(firstLevelMenu.route);
          return (
            <li key={firstLevelMenu.route} className={cn(styles.firstLevelLI, {
              [styles.firstLevelActive]: firstLevelMenu.id === firstCategory,
            })}>
              <Link href={`/${firstLevelMenu.route}`}>
                <a>
                  {firstLevelMenu.icon}
                  {firstLevelMenu.name}
                </a>
              </Link>
              {firstLevelMenu.id === firstCategory && (
                menu.length > 0 ?
                  buildSecondLevel(firstLevelMenu.route) :
                  <div className={styles.secondLevelBlock}>
                    <hr />
                    <ul className={styles.secondLevelList}>
                      <li>
                        Пока ничего не добавлено
                      </li>
                    </ul>
                  </div>
              )}
            </li>
          )
        })}
      </ul>
    )
  }

  const buildSecondLevel = (route: string) => {
    return (
      <div className={styles.secondLevelBlock}>
        <hr />
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
                <button type='button' onClick={() => toggleSecondLevel(menuItem._id.secondCategory)}>
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
    <nav className={styles.menu}>
      {buildFirstLevel()}
    </nav>
  );
}