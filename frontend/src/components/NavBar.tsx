import { useState, useRef, useEffect } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { motion, AnimatePresence } from 'motion/react';
import type { Variants } from 'motion/react';
import { NavLink } from './NavLink';
import ThemeToggle from './ThemeToggle';
import { MenuToggle } from './MenuToggle';
import styles from './NavBar.module.scss';

const navLinks = [
  { to: '/sentences', label: 'Sentences' },
  { to: '/concepts', label: 'Concepts' },
];

const sidebarVariants: Variants = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: 'circle(30px at 260px 40px)',
    transition: {
      delay: 0.2,
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
};

const navVariants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const itemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      duration: 0.4,
    },
  },
  closed: {
    y: -50,
    opacity: 0,
    transition: {
      type: 'spring',
      duration: 0.4,
    },
  },
}

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { height } = useDimensions(containerRef);

  return (
    <>
      <AnimatePresence>
        {isOpen ? <motion.div
          className={styles.overlay}
          onClick={() => setIsOpen(false)}
          initial={{backgroundColor: 'rgba(0,0,0,0)'}}
          animate={{backgroundColor: 'rgba(0,0,0,0.5)'}}
          exit={{backgroundColor: 'rgba(0,0,0,0)'}}
          transition={{ duration: 0.2 }}
        /> : null
        }
      </AnimatePresence>
      <AnimatePresence>

        <motion.nav
          initial={false}
          animate={isOpen ? 'open' : 'closed'}
          custom={height}
          ref={containerRef}
          className={styles.mobileNav}
        >
          <motion.div className={styles.mobileNavBackground} variants={sidebarVariants} >
            <motion.div variants={navVariants} className={styles.mobileNavList}>
              {navLinks.map((link) => (
                <motion.div
                  key={link.to}
                  variants={itemVariants}
                >
                  <NavLink 
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
                <motion.div
                  key={"themeToggle"}
                  variants={itemVariants}
                >
                <ThemeToggle />
              </motion.div>
            </motion.div>
            <MenuToggle toggle={() => setIsOpen(!isOpen)} />
          </motion.div>
        </motion.nav>
      </AnimatePresence>
    </>
  );
};

export const NavBar = () => {
  const isDesktop = useMediaQuery('(min-width: 768px)');


  return (
    <>
      <nav className={styles.navBar}>
        <div className={styles.navLinks}>
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to}>
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
        {isDesktop ? <ThemeToggle /> : <MobileNav />}
      </nav>
    </>
  );
};

const useDimensions = (ref: React.RefObject<HTMLDivElement | null>) => {
  const dimensions = useRef({ width: 0, height: 0 });

  useEffect(() => {
    if (ref.current) {
      dimensions.current.width = ref.current.offsetWidth;
      dimensions.current.height = ref.current.offsetHeight;
    }
  }, [ref]);

  return dimensions.current;
};
