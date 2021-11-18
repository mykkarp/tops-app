import ILayoutProps from './ILayout.props';
import styles from "./Layout.module.css";
import { Footer, Topbar, Sidebar } from './components';
import { FunctionComponent } from 'react';
import { AppProvider, IAppContext } from '../contexts/app.context';

function Layout({ children }: ILayoutProps): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <Topbar className={styles.topbar} />
      <Sidebar className={styles.sidebar} />
      <main className={styles.body}>
        {children}
      </main>
      <Footer className={styles.footer} />
    </div>
  );
}

export function withLayout<T extends IAppContext>(Component: FunctionComponent<T>) {
  return function withLayoutComponent(props: T): JSX.Element {
    return (
      <AppProvider menu={props.menu} firstCategory={props.firstCategory}>
        <Layout>
          <Component {...props} />
        </Layout>
      </AppProvider>
    )
  }
}