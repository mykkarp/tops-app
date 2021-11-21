import ISeoTextProps from './ISeoText.props';
import styles from "./SeoText.module.css";

export function SeoText({ seoHTML }: ISeoTextProps): JSX.Element {
  return (
    <article className={styles.seo} dangerouslySetInnerHTML={{ __html: seoHTML }} />
  );
}
