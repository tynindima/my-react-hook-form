import { h } from 'preact';
import { useForm } from 'react-hook-form';

const FormHook = () => {
  const { handleSubmit, register } = useForm();

  const onSubmit = (data) => { console.log(data) };

  return (
    <div className='container'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-box">
          <label className="input-label" htmlFor="name">Name:</label>
          <input type="text" name="name" id="name" ref={register} />
        </div>
        <div className="input-box">
          <label className="input-label" htmlFor="surname">Surname:</label>
          <input type="text" name="surname" id="surname" ref={register} />
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

export default FormHook;
