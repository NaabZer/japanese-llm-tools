import { Link } from '@tanstack/react-router';
import type { LinkProps } from '@tanstack/react-router';
import styles from './NavLink.module.scss';

type NavLinkProps = LinkProps & {
  children: React.ReactNode | (({ isActive }: { isActive: boolean }) => React.ReactNode);
};

export const NavLink = ({ children, ...props }: NavLinkProps) => {
  return (
    <Link {...props} className={`${styles.navLink} ${props.className || ''}`}>
      {typeof children === 'function' ? ({ isActive }) => children({ isActive }) : children}
    </Link>
  );
};
