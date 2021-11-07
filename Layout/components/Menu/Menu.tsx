import styles from "./Menu.module.css";
import cn from 'classnames';
import { useAppContext } from '../../../contexts/app.context';
import { FirstLevelMenuItem, PageItem } from '../../../interfaces/menu.interface';
import CoursesIcon from './Icons/courses.svg';
import ServicesIcon from './Icons/services.svg';
import BooksIcon from './Icons/books.svg';
import ProductsIcon from './Icons/products.svg';
import ArrowIcon from './Icons/arrow.svg';
import { TopLevelCategory } from '../../../interfaces/toppage.interface';

const firstLevelMenu: FirstLevelMenuItem[] = [
  { route: 'courses', name: 'Курсы', icon: <CoursesIcon />, id: TopLevelCategory.Courses },
  { route: 'services', name: 'Сервисы', icon: <ServicesIcon />, id: TopLevelCategory.Services },
  { route: 'books', name: 'Книги', icon: <BooksIcon />, id: TopLevelCategory.Books },
  { route: 'products', name: 'Товары', icon: <ProductsIcon />, id: TopLevelCategory.Products },
]

export function Menu(): JSX.Element {
  const { menu, setMenu, firstCategory } = useAppContext();

  const buildFirstLevel = () => {
    return (
      <ul className={cn(styles.firstLevelList)}>
        {firstLevelMenu.map((menu) => {
          return (
            <li key={menu.route} className={cn(styles.firstLevelLI, {
              [styles.firstLevelActive]: menu.id === firstCategory,
            })}>
              <a href={`/${menu.route}`}>
                {menu.icon}
                {menu.name}
              </a>
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
            return (
              <li key={menuItem._id.secondCategory} className={cn(styles.secondLevelLI, {
                [styles.secondLevelLIOpen]: menuItem.isOpen
              })}>
                <button> {/*temp*/}
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
              [styles.thirdLevelCurrentCategory]: false // temp
            })}>
              <a href={`${route}/${page.alias}`}>{page.category}</a>
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