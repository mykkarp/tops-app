import IReviewFormProps from './IReviewForm.props';
import styles from "./ReviewForm.module.css";
import cn from 'classnames';
import { Button, Input, Ptag, Rating, Textarea } from '../../../../components';
import CloseIcon from './cross.svg';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { API } from '../../../../helpers/api';
import { ForwardedRef, forwardRef, useState } from 'react';

export const ReviewForm = forwardRef(({ productId, className, ...props }: IReviewFormProps, ref: ForwardedRef<HTMLFormElement>): JSX.Element => {
  const { register, control, handleSubmit, formState: { errors }, reset, clearErrors } = useForm<IForm>();
  const [isSuccessSent, setIsSuccessSent] = useState<boolean>(false);
  const [failedSentMessage, setFailedSentMessage] = useState<string>('');

  const onSubmitHandler = async (formData: IForm) => {
    clearErrors();
    try {
      const { data } = await axios.post<IReviewSentResponse>(API.review.createDemo, { ...formData, productId });
      if (data.message) {
        setIsSuccessSent(true);
        reset();
      } else {
        setFailedSentMessage('Что-то пошло не так.');
      }
    } catch (error) {
      if (error instanceof Error) {
        setFailedSentMessage(error.message);
      }
    }
  }

  return (
    <>
      <form ref={ref} onSubmit={handleSubmit(onSubmitHandler)} className={cn(className, styles.form)} {...props}>
        <Input
          {...register('name', { validate: (value) => { return !!value.trim() || 'Заполните имя' } })}
          type='text'
          placeholder='Имя'
          error={errors.name}
          aria-invalid={!!errors.name}
        />
        <Input
          {...register('title', { validate: (value) => { return !!value.trim() || 'Заполните заголовок' } })}
          type='text'
          placeholder='Заголовок отзыва'
          error={errors.title}
          aria-invalid={!!errors.title}
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
          {...register(
            'description',
            { validate: (value) => { return !!value.trim() || 'Заполните отзыв' } }
          )}
          placeholder='Текст отзыва'
          error={errors.description}
          aria-label='текст отзыва'
          aria-invalid={!!errors.description}
        />
        <div className={styles.submit}>
          <Button type='submit' appearance='primary' className={styles.send}>Отправить</Button>
          <Ptag size='s'>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</Ptag>
        </div>
      </form>
      {isSuccessSent && (
        <div className={cn(styles.success, styles.panel)} role='alert'>
          <div className={styles.successTitle}>Ваш отзыв отправлен!</div>
          <div className={styles.description}>
            Спасибо, ваш отзыв будет опубликован после проверки.
          </div>
          <button
            onClick={() => setIsSuccessSent(false)}
            type='button'
            className={styles.buttonClose}
            aria-label='закрыть оповещение'
          >
            <CloseIcon />
          </button>
        </div>
      )}
      {failedSentMessage && (
        <div className={cn(styles.error, styles.panel)} role='alert'>
          <div className={styles.description}>
            {failedSentMessage}
          </div>
          <button
            onClick={() => setFailedSentMessage('')}
            type='button'
            className={cn(styles.errorClose, styles.buttonClose)}
            aria-label='закрыть оповещение'
          >
            <CloseIcon />
          </button>
        </div>
      )}
    </>
  );
});

interface IReviewSentResponse {
  message: string;
}

interface IForm {
  name: string;
  title: string;
  description: string;
  rating: number;
} 