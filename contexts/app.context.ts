import React, { createContext, PropsWithChildren, useContext, useState } from 'react';
import { MenuItem } from '../interfaces/menu.interface';
import { TopLevelCategory } from '../interfaces/toppage.interface';

export interface IAppContext {
  menu: MenuItem[];
  firstCategory: TopLevelCategory;
  setMenu?: (newMenu: MenuItem[]) => void;
}

const AppContext = createContext<IAppContext>({ menu: [], firstCategory: TopLevelCategory.Courses });

export function useAppContext() {
  return useContext(AppContext);
}

export function AppProvider({ children, menu, firstCategory }: PropsWithChildren<IAppContext>): JSX.Element {
  const [menuState, setMenuState] = useState<MenuItem[]>(menu);

  const setMenu = (menu: MenuItem[]) => {
    setMenuState(menu);
  }

  return React.createElement(AppContext.Provider, { value: { menu: menuState, firstCategory, setMenu } }, children); // here i had some bugs with JSX, so i decided to work with React.createElement
}