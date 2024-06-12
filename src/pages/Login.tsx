import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import { setCredentials } from '../redux/actions';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [on, setOn] = useState(true);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = (
    { target }: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name: targetName, value } = target;
    const updatedLoginForm = { ...loginForm, [targetName]: value };
    const emailInformation = updatedLoginForm.email.split('');
    const checkEmail = emailInformation.filter((char) => char === '@');

    setLoginForm(updatedLoginForm);

    const formIsValid = updatedLoginForm.password.length > 6
        && checkEmail.length === 1
        && updatedLoginForm.email.includes('.com');

    setOn(!formIsValid);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(setCredentials(loginForm));
    localStorage.setItem('user', JSON.stringify({ email: loginForm.email }));
    navigate('/meals');
  };

  return (
    <form
      onSubmit={ handleSubmit }
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
      >
        Enter
      </Button>
    </form>
  );
}

export default Login;
