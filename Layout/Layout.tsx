import ILayoutProps from './ILayout.props';
import styles from "./Layout.module.css";
import { Footer, Topbar, Sidebar } from './components';
import { FunctionComponent, useEffect, useRef } from 'react';
import { AppProvider, IAppContext } from '../contexts/app.context';
import { ScrollToUp } from '../components';

function Layout({ children }: ILayoutProps): JSX.Element {
  const afterSkip = useRef<HTMLButtonElement>(null);
  let afterSkipFocusable = -1;

  const onBlurAfterSkipHandler = () => {
    afterSkipFocusable = -1;
  }
  const goToContent = () => {
    afterSkipFocusable = 0;
    afterSkip.current?.focus();
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.skipDiv}>
        <button
          type='button'
          tabIndex={1}
          className={styles.skipButton}
          onClick={goToContent}
        >
          Перейти сразу к содержанию
        </button>
      </div>
      <Topbar className={styles.topbar} />
      <Sidebar className={styles.sidebar} />
      <main className={styles.body}>
        <button
          tabIndex={afterSkipFocusable}
          ref={afterSkip}
          onBlur={onBlurAfterSkipHandler}
          className={styles.afterSkip}
        />
        {children}
      </main>
      <Footer className={styles.footer} />
      <ScrollToUp />
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