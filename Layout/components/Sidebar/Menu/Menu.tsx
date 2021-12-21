import styles from "./Menu.module.css";
import cn from 'classnames';
import ArrowIcon from './Icons/arrow.svg';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAppContext } from '../../../../contexts/app.context';
import { firstLevelMenu } from '../../../../helpers';
import { PageItem } from '../../../../interfaces/menu.interface';
import { motion, AnimatePresence } from 'framer-motion';

export function Menu(): JSX.Element {
  const { menu, setMenu, firstCategory } = useAppContext();
  const router = useRouter();

  const thirdLevelVariants = {
    hidden: {
      margin: 0,
    },
    visible: {
      margin: '10px 0 0 20px',
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.06,
      }
    },
    exit: {
      margin: 0,
      height: 0,
      transition: {
        when: 'afterChildren',
        staggerDirection: -1,
        staggerChildren: 0.06
      }
    }
  }

  const thirdLevelChildrenVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1
    },
    exit: {
      opacity: 0
    }
  }

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
                <AnimatePresence
                  initial={false}
                  exitBeforeEnter={true}
                  onExitComplete={() => console.log('ты лох')}
                >
                  {menuItem.isOpen && buildThirdLevel(menuItem.pages, route)}
                </AnimatePresence>
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
      <motion.ul
        layout
        initial='hidden'
        animate='visible'
        exit='exit'
        variants={thirdLevelVariants}
        className={cn(styles.thirdLevelList)}
      >
        {pages.map((page) => {
          return (
            <motion.li variants={thirdLevelChildrenVariants} key={page.alias} className={cn(styles.thirdLevelLI, {
              [styles.thirdLevelCurrentCategory]: `/${route}/${page.alias}` === router.asPath
            })}>
              <Link href={`/${route}/${page.alias}`}><a>{page.category}</a></Link>
            </motion.li>
          )
        })}
      </motion.ul>
    )
  }

  return (
    <nav className={styles.menu}>
      {buildFirstLevel()}
    </nav>
  );
}