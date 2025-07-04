import { useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { motion } from 'motion/react';
import { NavLink } from './NavLink';
import ThemeToggle from './ThemeToggle';
import styles from './NavBar.module.scss';

export const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { to: '/sentences', label: 'Sentences' },
    { to: '/concepts', label: 'Concepts' },
  ];

  return (
    <>
      <nav className={styles.navBar}>
        <div className={styles.navLinks}>
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="underline"
                      className={styles.underline}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>
        {isDesktop && <ThemeToggle />}
        <button className={styles.hamburger} onClick={toggleMenu}>
          &#9776;
        </button>
      </nav>
      <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.isOpen : ''}`}>
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            onClick={toggleMenu}
          >
            {link.label}
          </NavLink>
        ))}
        {!isDesktop && (
          <div className={styles.mobileThemeToggle}>
            <ThemeToggle />
          </div>
        )}
      </div>
    </>
  );
};
