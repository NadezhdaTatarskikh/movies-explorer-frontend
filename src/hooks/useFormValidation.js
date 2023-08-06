import { useCallback, useState } from 'react';
import { isEmail } from 'validator';

//хук управления формой и валидации формы
export const useFormValidation = () => {
  const [values, setValues] = useState({}); // // Введённые значения
  const [errors, setErrors] = useState({}); // Переменная состояния ошибки
  const [isValid, setIsValid] = useState(false); // Переменная состония поля input (валидность)

  // обработчик вводимых данных
  const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;

    if (name === 'email') {
      const emailError = !isEmail(value)
        ? 'Неверный формат электронной почты'
        : '';
      setErrors({ ...errors, [name]: emailError });
    } else {
      setErrors({ ...errors, [name]: event.target.validationMessage });
    }

    setIsValid(event.target.closest('form').checkValidity());  
    setValues({ ...values, [name]: value });  
  };

  // обработчик очистки формы
  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  // возвращаем обработчики и стейты
  return { values, handleChange, errors, isValid, resetForm, setValues };
};
