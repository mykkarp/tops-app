import ILayoutProps from './ILayout.props';
import styles from "./Layout.module.css";
import cn from 'classnames';
import { Footer, Header, Sidebar } from './components';
import { FunctionComponent } from 'react';

function Layout({ children }: ILayoutProps): JSX.Element {
  return (
    <>
      <Header />
      <div>
        <Sidebar />
        <main>
          {children}
        </main>
      </div>
      <Footer />
    </>
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