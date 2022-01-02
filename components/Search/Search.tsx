import ISearchProps from './ISearch.props';
import styles from "./Search.module.css";
import cn from 'classnames';
import { Button, Input } from '..';
import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/router';
import SearchIcon from './search.svg';

export function Search({ className, ...props }: ISearchProps): JSX.Element {
  const [search, setSearch] = useState<string>('');
  const router = useRouter();

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const goToSearch = (event: FormEvent) => {
    event.preventDefault();

    router.push({
      pathname: '/search',
      query: {
        query: search
      }
    });
  };

  return (
    <form
      role='search'
      className={cn(className, styles.search)}
      onSubmit={goToSearch}
      {...props}
    >
      <Input
        placeholder='Поиск...'
        value={search}
        onChange={onChangeHandler}
        className={styles.input}
      />
      <Button
        appearance='primary'
        className={styles.button}
        type='submit'
        aria-label='искать по сайту'
      >
        <SearchIcon />
      </Button>
    </form>
  );
}