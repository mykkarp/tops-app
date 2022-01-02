import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export default interface ICardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  color?: 'white' | 'blue';
  children: ReactNode;
}