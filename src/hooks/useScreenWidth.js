import { useEffect, useState } from 'react';
import {
  SCREEN_SM,
  SCREEN_MD,
  SCREEN_LG,
  SCREEN_XL,
  SCREEN_XXL,
} from '../utils/Constants'

// функция установки ширины экрана
export const useScreenWidth = () => {
  // eslint-disable-next-line no-restricted-globals
  const [width, setWidth] = useState(window.innerWidth); // устанавливаем стейт screenWidth

  useEffect(() => {
    // обработчик изменения размера экрана
    const handleScreenResize = (event) => { 
      setWidth(event.target.window.innerWidth);
    };
      window.addEventListener('resize', handleScreenResize); // при монтировании ставим обработчик изменения размера окна
        return () => {window.removeEventListener('resize', handleScreenResize) // удаляем слушатель
    }
  }, [width]);
return {
  width,
  isScreenSm: width >= SCREEN_SM,
  isScreenMd: width >= SCREEN_MD,
  isScreenLg: width >= SCREEN_LG,
  isScreenXl: width >= SCREEN_XL,
  isScreenXxl: width >= SCREEN_XXL,
}; 
};
