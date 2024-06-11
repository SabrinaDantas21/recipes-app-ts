import { useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';

function Login() {
  const [on, setOn] = useState(true);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = (
    { target }: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name: targetName, value } = target;
    setLoginForm({ ...loginForm, [targetName]: value });
    formIsValid();
  };

  const emailInformation = loginForm.email.split('');
  const checkEmail = emailInformation.filter((char) => char === '@');

  const formIsValid = () => {
    console.log('entrou');
    if (
      loginForm.password.length >= 6
      && checkEmail.length === 1
      && loginForm.email.includes('.com')) {
      setOn(false);
    } else {
      setOn(true);
    }
  };

  return (
    <form
      onSubmit={ (event) => {
        event.preventDefault();
      } }
    >
      <Input
        data-testid="email-input"
        type="text"
        placeholder="Email"
        name="email"
        onChange={ handleChange }
        required
      />
      <Input
        data-testid="password-input"
        type="password"
        placeholder="Password"
        name="password"
        onChange={ handleChange }
        required
      />
      <Button
        data-testid="login-submit-btn"
        type="submit"
        disabled={ on }
        onClick={ () => (console.log('Funçao temporária btn')) }
      >
        Enter
      </Button>
    </form>
  );
}

export default Login;
