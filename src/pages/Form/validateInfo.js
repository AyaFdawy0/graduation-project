export default function validateInfo(values) {
    let errors = {};
  
    if (!values.name.trim()) {
      errors.name = 'Username required';
    }
    // else if (!/^[A-Za-z]+/.test(values.name.trim())) {
    //   errors.name = 'Enter a valid name';
    // }
  
    if (!values.email) {
      errors.email = 'Email required';
    } else if (!/\S+@[gmail]+\.\S+/.test(values.email)) {
      errors.email = "Email address isn't valid";
    }
    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 9) {
      errors.password = 'Password needs to be 9 characters or more';
    }
  
    if (!values.confirmPassword) {
      errors.confirmPassword = 'Password is required';
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = 'Passwords do not match';
    }
    return errors;
  }