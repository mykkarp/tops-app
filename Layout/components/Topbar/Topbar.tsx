import ITopbarProps from './ITopbar.props';
import styles from "./Topbar.module.css";
import cn from 'classnames';
import LogoIcon from '../../logo.svg';
import { ButtonIcon } from '../../../components';
import { motion } from 'framer-motion';
import { Sidebar } from '..';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export function Topbar({ className, ...props }: ITopbarProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const variants = {
    open: {
      opacity: 1,
      x: 0,
      transition: {
        stiffness: 20
      }
    },
    hidden: {
      opacity: 0,
      x: '100%'
    }
  }

  useEffect(() => {
    setIsOpen(false);
  }, [router]);

  return (
    <header className={cn(className, styles.header)} {...props}>
      <LogoIcon />
      <ButtonIcon appearance='white' icon='burger' onClick={() => setIsOpen(true)} />
      <motion.nav
        className={styles.mobileMenu}
        variants={variants}
        animate={isOpen ? 'open' : 'hidden'}
        initial={'hidden'}
      >
        <Sidebar />
        <ButtonIcon
          appearance='white'
          icon='cross'
          className={styles.menuClose}
          onClick={() => setIsOpen(false)}
        />
      </motion.nav>
    </header>
  );
}