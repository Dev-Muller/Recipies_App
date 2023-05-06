import { useCallback, useContext, useEffect, useState } from 'react';
import './login.css';
import { Link } from 'react-router-dom';
import AppContext from '../../context/AppContext';

function Login() {
  const [isDisabled, setIsDisabled] = useState(true);
  const { login, setLogin } = useContext(AppContext);

  const handleErrors = useCallback(() => {
    const emailRegex = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
    const isValidEmail = emailRegex.test(login.email);

    const correctLength = 6;
    const errors = [
      login.email.length === 0,
      login.password.length <= correctLength,
      !isValidEmail,
    ];
    const noErrors = errors.every((error) => error === false);
    setIsDisabled(!noErrors);
  }, [login]);

  useEffect(() => {
    handleErrors();
  }, [handleErrors, login.email]);

  const handleChange = (functionName, { value, name }) => {
    functionName((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClick = (email) => {
    const user = {
      email,
    };
    localStorage.setItem('user', JSON.stringify(user));
  };

  return (
    <div className="login-body">
      <div className="login-container">
        <label htmlFor="email">
          Email:
        </label>
        <input
          id="email"
          name="email"
          value={ login.email }
          type="email"
          data-testid="email-input"
          onChange={ ({ target }) => handleChange(setLogin, target) }
        />

        <label htmlFor="password">
          Password:
        </label>
        <input
          id="password"
          name="password"
          value={ login.password }
          type="password"
          data-testid="password-input"
          onChange={ ({ target }) => handleChange(setLogin, target) }
        />

        <Link to="/meals">
          <button
            data-testid="login-submit-btn"
            disabled={ isDisabled }
            onClick={ () => handleClick(login.email) }
          >
            Enter

          </button>
        </Link>
      </div>
    </div>
  );
}

export default Login;
