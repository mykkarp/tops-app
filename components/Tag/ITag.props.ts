import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export default interface IHtagProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactNode,
  size?: 's' | 'm',
  href?: string,
  color?: 'ghost' | 'primary' | 'green' | 'red' | 'gray',
}