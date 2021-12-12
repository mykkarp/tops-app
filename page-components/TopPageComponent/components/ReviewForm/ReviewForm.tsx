import IReviewFormProps from './IReviewForm.props';
import styles from "./ReviewForm.module.css";
import cn from 'classnames';
import { Button, Input, Ptag, Rating, Textarea } from '../../../../components';
import { useState } from 'react';
import CloseIcon from './cross.svg';
import { useForm, Controller } from 'react-hook-form';

export function ReviewForm({ productId, className, ...props }: IReviewFormProps): JSX.Element {
  const { register, control, handleSubmit, formState: { errors } } = useForm<IForm>();

  const onSubmitHandler = (data: IForm) => {
    console.log(data);

  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitHandler)} className={cn(className, styles.form)} {...props}>
        <Input
          {...register('name', { required: { value: true, message: 'Заполните имя' } })}
          type='text'
          placeholder='Имя'
          error={errors.name}
        />
        <Input
          {...register('title', { required: { value: true, message: 'Заполните заголовок' } })}
          type='text'
          placeholder='Заголовок отзыва'
          error={errors.title}
        />
        <div className={styles.rating}>
          <span>Оценка:</span>
          <Controller
            control={control}
            name='rating'
            rules={{ required: { value: true, message: 'Укажите оценку' } }}
            render={({ field }) => (
              <Rating
                isEditable={true}
                ref={field.ref}
                setRating={field.onChange}
                rating={field.value}
                error={errors.rating}
              />
            )}
          />
        </div>
        <Textarea
          className={styles.textarea}
          {...register('description', { required: { value: true, message: 'Заполните отзыв' } })}
          placeholder='Текст отзыва'
          error={errors.description}
        />
        <div className={styles.submit}>
          <Button type='submit' appearance='primary' className={styles.send}>Отправить</Button>
          <Ptag size='s'>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</Ptag>
        </div>
      </form>
      <div className={styles.success}>
        <div className={styles.successTitle}>Ваш отзыв отправлен!</div>
        <div className={styles.description}>
          Спасибо, ваш отзыв будет опубликован после проверки.
        </div>
        <button type='button' className={styles.successClose}>
          <CloseIcon />
        </button>
      </div>
    </>
  );
}

interface IForm {
  name: string;
  title: string;
  description: string;
  rating: number;
} 