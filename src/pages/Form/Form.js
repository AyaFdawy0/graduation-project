
import React, { useState } from 'react';
import Calendar from '../Calendar/Calendar';
import Profile from '../Profile/Profile';
import styles from './Form.module.css';
import FormLogin from './FormLogin';
import FormSignup from './FormSignup';
import FormSuccess from './FormSuccess';
import {useHistory} from "react-router-dom"


const Form = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
  }
  const history =useHistory();
  return (
    <>
      <div className={styles.formcontainer}>
      {/* <FormSignup submitForm={submitForm} /> */}
        {!isSubmitted ? (
          <FormSignup submitForm={submitForm} />
        ) : (
          history.push("/Profile/:id")
        )}
      </div>
    </>
  );
};

export default Form;