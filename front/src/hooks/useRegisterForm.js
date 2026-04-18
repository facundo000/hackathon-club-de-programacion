import { useMemo, useState } from 'react';
import { authApi } from '../api';

export function useRegisterForm({ onSuccess }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [wasSubmitted, setWasSubmitted] = useState(false);
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isUsernameValid = useMemo(() => username.trim().length >= 3, [username]);
  const isEmailValid = useMemo(() => {
    if (!email) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }, [email]);
  const isPasswordValid = useMemo(() => password.length >= 8, [password]);
  const passwordsMatch = useMemo(
    () => password === confirmPassword && confirmPassword.length > 0,
    [password, confirmPassword],
  );

  const isFormValid = isUsernameValid && isEmailValid && isPasswordValid && passwordsMatch;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setWasSubmitted(true);
    setServerError('');

    if (!isFormValid) return;

    setIsLoading(true);
    try {
      await authApi.register({ username: username.trim(), email, password });
      onSuccess();
    } catch (err) {
      setServerError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    wasSubmitted,
    isUsernameValid,
    isEmailValid,
    isPasswordValid,
    passwordsMatch,
    isFormValid,
    serverError,
    isLoading,
    handleSubmit,
  };
}
