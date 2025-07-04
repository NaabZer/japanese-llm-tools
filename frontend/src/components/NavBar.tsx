import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { useMediaQuery } from 'usehooks-ts';
import ThemeToggle from './ThemeToggle';
import styles from './NavBar.module.scss';

export const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className={styles.navBar}>
        <div className={styles.navLinks}>
          <Link to="/sentences" className={styles.navLink}>
            Sentences
          </Link>
          <Link to="/concepts" className={styles.navLink}>
            Concepts
          </Link>
        </div>
        {isDesktop && <ThemeToggle />}
        <button className={styles.hamburger} onClick={toggleMenu}>
          &#9776;
        </button>
      </nav>
      <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.isOpen : ''}`}>
        <Link to="/sentences" className={styles.mobileNavLink} onClick={toggleMenu}>
          Sentences
        </Link>
        <Link to="/concepts" className={styles.mobileNavLink} onClick={toggleMenu}>
          Concepts
        </Link>
        {!isDesktop && (
          <div className={styles.mobileThemeToggle}>
            <ThemeToggle />
          </div>
        )}
      </div>
    </>
  );
};
