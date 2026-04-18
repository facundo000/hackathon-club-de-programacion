import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api';
import { useAuth } from '../context/AuthContext';

export function useLoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [wasSubmitted, setWasSubmitted] = useState(false);
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const isEmailValid = useMemo(() => {
    if (!email) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }, [email]);

  const isPasswordValid = useMemo(() => password.length >= 8, [password]);
  const isFormValid = isEmailValid && isPasswordValid;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setWasSubmitted(true);
    setServerError('');

    if (!isFormValid) return;

    setIsLoading(true);
    try {
      const { token, user } = await authApi.login({ email, password });
      login(token, user);
      navigate('/home');
    } catch (err) {
      setServerError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    rememberMe,
    setRememberMe,
    wasSubmitted,
    isEmailValid,
    isPasswordValid,
    isFormValid,
    serverError,
    isLoading,
    handleSubmit,
  };
}
