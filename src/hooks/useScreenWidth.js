import { useEffect, useState } from 'react';

// функция установки ширины экрана
export const useScreenWidth = () => {
  const [width, setWidth] = useState(window.innerWidth); // устанавливаем стейт screenWidth

  useEffect(() => {
    // обработчик изменения размера экрана
    const handleScreenResize = (event) => { 
      setWidth(event.target.innerWidth);
    };
      window.addEventListener('resize', handleScreenResize); // при монтировании ставим обработчик изменения размера окна
        return () => window.removeEventListener('resize', handleScreenResize); // удаляем слушатель
  }, []);
  return (width);
}
