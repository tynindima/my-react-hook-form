import { useRef, useState } from 'preact/hooks';

export const useMyForm = () => {
  const inputRef = useRef({});
  const argRef = useRef([]);
  const [errors, setErrors] = useState({});

  const clerMyRefValues = () => {
    const inputKeys = Object.keys(inputRef.current);
    console.log(inputKeys);
    inputKeys.forEach((input) => {
      inputRef.current[input].value = '';
    });
  };

  //function for submit
  const handlerSubmit = (func) => {
    return (e) => {
      e.preventDefault();
      //values for func callback
      const values = {};
      for (let key in inputRef.current) {
        values[key] = inputRef.current[key].value;
      }
      const errorTemp = {};

      argRef.current.forEach((input) => {
        if (input.required) {
          errorTemp[input.name] = inputRef.current[input.name].value === '';
        }
        if (input.maxLength) {
          errorTemp[input.name] = inputRef.current[input.name].value.length > input.maxLength;
        }
      });

      setErrors(prev => ({
        ...prev,
        ...errorTemp
      }));

      console.log(argRef.current);
      console.log(inputRef.current);

      func(values);
      const isErrors = Object.values(errorTemp);
      if (!isErrors.includes(true)) {
        clerMyRefValues();
      }

    };
  };

  //register
  function register(arg) {
    if (arg instanceof HTMLElement) {
      const { name, value } = arg;
      if (argRef.current.findIndex(item => item.name === name) === -1) {
        argRef.current.push({ name, value });
      }

      inputRef.current[arg.name] = arg;
    } else {

      return (e) => {
        if (e) {
          const { name, value } = e;
          if (argRef.current.findIndex(item => item.name === name) === -1) {
            argRef.current.push({ name, value, ...arg });
          }
          return inputRef.current[e.name] = e;
        }
        if (!e) {
        }
      }
    }
  }

  return {
    handlerSubmit,
    register,
    errors,
  }
}
