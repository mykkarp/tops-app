import styles from "./ScrollToUp.module.css";
import { useScrollY } from '../../hooks/useScrollY';
import { useAnimation, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ButtonIcon } from '..';

function useHeightCrossing(height: number): 'crossingInTop' | 'crossingInBottom' {
  const yPosition = useScrollY();
  const [crossing, setCrossing] = useState<'crossingInTop' | 'crossingInBottom'>('crossingInBottom');

  useEffect(() => {
    if ((yPosition > height) && crossing !== 'crossingInBottom') setCrossing('crossingInBottom');
    if ((yPosition < height) && crossing !== 'crossingInTop') setCrossing('crossingInTop');
  }, [yPosition])

  return crossing;
}

export function ScrollToUp(): JSX.Element {
  const controls = useAnimation();
  const minHeightForAppear = 700;
  const heightCrossing = useHeightCrossing(minHeightForAppear);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  useEffect(() => {
    if (heightCrossing === 'crossingInBottom') {
      controls.start({ bottom: '30px' });
    } else {
      controls.start({ bottom: '-50px' })
    }
  }, [heightCrossing, controls])

  return (
    <motion.div
      className={styles.up}
      initial={{ bottom: '-50px' }}
      transition={{ type: "spring", stiffness: 150 }}
      animate={controls}
    >
      <ButtonIcon onClick={scrollToTop} appearance='primary' icon='up' />
    </motion.div>
  );
}