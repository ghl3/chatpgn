// components/Header.tsx

import Link from "next/link";
import styles from "../styles/Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link href="/">Home</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/gameReview">Game Review</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
