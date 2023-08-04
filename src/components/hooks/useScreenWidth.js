import { useEffect, useState, useCallback } from 'react';

// функция установки ширины экрана
export const useScreenWidth = () => {
  // eslint-disable-next-line no-restricted-globals
  const getScreenWidth = useCallback(() => screen.innerWidth, []); // получаем ширину экрана
  const [screenWidth, setScreenWidth] = useState(getScreenWidth()); // устанавливаем стейт screenWidth

  useEffect(() => {

    // обработчик изменения размера экрана
    const handleScreenResize = () => { 
      setScreenWidth(getScreenWidth());
      window.addEventListener('resize', resizeController, false); // при монтировании ставим обработчик изменения размера окна
    };

    let timer;

    const resizeController = () => {
        if (!timer) { timer = setTimeout(() => { timer = null; handleScreenResize(); }, 1000); // 1 кадр в секунду
      };
        return () => window.removeEventListener('resize', handleScreenResize) // удаляем слушатель
    }
}, [getScreenWidth]);
return screenWidth;
}
