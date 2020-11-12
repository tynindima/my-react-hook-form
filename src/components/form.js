import { h } from 'preact';
import { useMyForm } from '../hooks/useMyForm';

const Form = () => {
  const { handlerSubmit, register, errors } = useMyForm();

  const onSubmit = (data) => { console.log(data) };
  console.log(errors, 'errors');

  return (
    <div className='container'>
      <h3>My own hook form</h3>
      <form onSubmit={handlerSubmit(onSubmit)}>
        <div>
          <label className="input-label" htmlFor="name">Name:</label>
          <input type="text" name="name" id="name" ref={register({ required: true })} />
          {errors.name && " Your input is required"}
        </div>
        <div className="input-box">
          <label className="input-label" htmlFor="surname">Surname:</label>
          <input type="text" name="surname" id="surname" ref={register({ maxLength: 10 })} />
          {errors.surname && " Your input is more than maxLength"}
        </div>
        <div className="input-box">
          <label className="input-label" htmlFor="age">Age:</label>
          <input type="text" name="age" id="age" ref={register} />
        </div>
        <button>submit</button>
      </form>
    </div>
  )
}

export default Form;
