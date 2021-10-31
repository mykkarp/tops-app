import ILayoutProps from './ILayout.props';
import styles from "./Layout.module.css";
import cn from 'classnames';
import { Footer, Header, Sidebar } from './components';
import { FunctionComponent } from 'react';

function Layout({ children }: ILayoutProps): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <Header className={styles.header} />
      <Sidebar className={styles.sidebar} />
      <main className={styles.body}>
        {children}
      </main>
      <Footer className={styles.footer} />
    </div>
  );
}

export function withLayout<T extends Record<string, unknown>>(Component: FunctionComponent<T>) {
  return function withLayoutComponent(props: T): JSX.Element {
    return (
      <Layout>
        <Component {...props} />
      </Layout>
    )
  }
}