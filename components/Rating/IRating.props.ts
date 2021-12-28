import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';

export default interface IRatingProps extends DetailedHTMLProps<HTMLAttributes<HTMLFieldSetElement>, HTMLFieldSetElement> {
  isEditable?: boolean;
  rating: number;
  setRating?: (rating: number) => void;
  error?: FieldError;
}