import React, { useState } from 'react';
import axios from 'axios';
import * as yup from 'yup';
import schema from '../validation/formSchema'

const initialValues = {
  name: '',
  size: '',
  pepperoni: false,
  green_peppers: false,
  onions: false,
  surprise: false,
  special: '',
}




const Pizza = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const [formValues, setFormValues] = useState(initialValues)

  const validate = (name, value) => {
    yup.reach(schema, name)
      .validate(value)
      .then(() => setErrorMessage(''))
      .catch(err => setErrorMessage(err.errors[0]))
  }

  const submit = (evt) => {
    evt.preventDefault();
    console.log(formValues.name)
    axios.post('https://reqres.in/api/orders', formValues)
    .then(res => console.log(res.data))
    .catch(err => console.error(err))
    .finally(setFormValues(initialValues))
  }

  const inputChange = (evt) => {
    const { name, value, type, checked } = evt.target;
    if (name === 'name') {
      validate(name, value)
    }
    const useValue = type === 'checkbox' ? checked : value;
    setFormValues({
      ...formValues,
      [name]: useValue
    })
  }

  return (
    <div className='form-container'>
      <form id='pizza-form' onSubmit={submit}>
        <label>Name: 
          <input 
            id='name-input'
            type='text'
            name='name'
            value={formValues.name}
            onChange={inputChange}
          />
        </label>

        <label>Pizza Size:
          <select
            id='size-dropdown'
            name='size'
            value={formValues.size}
            onChange={inputChange}

          >
            <option value=''>--Select a size of pizza--</option>
            <option value='small'>Small - 8 inch</option>
            <option value='medium'>Medium - 12 inch</option>
            <option value='large'>Large - 18 inch</option>
            <option value='mongo'>Mongo - 40 inch</option>
          </select>
        </label>

        <label>Pepperoni:
          <input 
            type='checkbox'
            name='pepperoni'
            checked={formValues.pepperoni}
            onChange={inputChange}
          />
        </label>
        <label>Green Peppers:
          <input 
            type='checkbox'
            name='green_peppers'
            checked={formValues.green_peppers}
            onChange={inputChange}
          />
        </label>
        <label>Onions:
          <input 
            type='checkbox'
            name='onions'
            checked={formValues.onions}
            onChange={inputChange}
          />
        </label>
        <label>A Gross Surprise:
          <input 
            type='checkbox'
            name='surprise'
            checked={formValues.surprise}
            onChange={inputChange}
          />
        </label>
        <label>Special instructions:
          <input 
            id='special-text'
            type='text'
            name='special'
            value={formValues.special}
            onChange={inputChange}
          />
        </label>
        <button id='order-button'>Place Your Order</button>
      </form>
      {errorMessage}
    </div>
  )
}

export default Pizza;