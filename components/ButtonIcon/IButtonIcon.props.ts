import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import up from './up.svg';
import burger from './burger.svg';
import cross from './cross.svg';

export const icons = {
  up,
  burger,
  cross
};

export type IconsTypes = keyof typeof icons;

export default interface IButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  appearance: 'primary' | 'white';
  icon: IconsTypes;
}