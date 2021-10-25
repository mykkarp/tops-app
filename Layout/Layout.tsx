import ILayoutProps from './ILayout.props';
import styles from "./Layout.module.css";
import cn from 'classnames';
import { Footer, Header, Sidebar } from './components';

export function Layout({ children }: ILayoutProps): JSX.Element {
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