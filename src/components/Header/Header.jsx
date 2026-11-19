import styles from "./Header.module.css";
import { labels } from "../../data/labels";

function Header() {
  return (
    <header className={styles.header}>
      <h1>{labels.maternityProducts}</h1>
      <h2 className={styles.headline}>{labels.headline}</h2>
    </header>
  );
}

export default Header;
