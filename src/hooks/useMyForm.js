import { useRef, useState } from 'preact/hooks';

export const useMyForm = () => {
  const inputRef = useRef([]);
  const argRef = useRef([]);
  const [errors, setErrors] = useState({});


  const clerMyRefValues = () => {
    inputRef.current.forEach((item) => {
      item.value = '';
    });
  };

  //function for submit
  const handlerSubmit = (func) => {
    return (e) => {
      e.preventDefault();
      //get values
      const values = inputRef.current.reduce((acc, item) => {
        return {
          ...acc,
          [item.name]: item.value
        }
      }, {});

      const argWithVal = inputRef.current.map((item, i) => {
        return {
          name: item.name,
          value: item.value,
          ...argRef.current[i][0]
        }
      });

      const curErrors = argWithVal.reduce((acc, item) => {
        if (item.required) {
          return {
            ...acc,
            [item.name]: item.value === ''
          }
        }
        return acc
      }, {});


      // setErrors(curErrors);
      console.log(argRef);
      // console.log(argWithVal);
      func(values);
      clerMyRefValues();
    };
  };

  //register
  function register(arg) {

    if (arg instanceof HTMLElement) {
      const { name, value } = arg;
      argRef.current.push({ name, value });
      inputRef.current.push(arg);
    } else {

      return (e) => {
        const { name, value } = e;
        argRef.current.push({ name, value, ...arg });
        return inputRef.current.push(e);
      }
    }
  }

  return {
    handlerSubmit,
    register,
    errors,
  }
}
