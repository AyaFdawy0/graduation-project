import { useState, useEffect } from 'react';


const useForm = (callback, validate,history) => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword:''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };




  // useEffect(
  //   () => {
  //     if (Object.keys(errors).length === 0 && isSubmitting) {
  //       callback();
  //     }
  //   },
  //   [errors]
  // );

  return { handleChange,setErrors, values, errors };
};

export default useForm;