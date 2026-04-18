import { useMemo, useState } from 'react';

export function useLoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [wasSubmitted, setWasSubmitted] = useState(false);

  const isEmailValid = useMemo(() => {
    if (!email) {
      return false;
    }

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }, [email]);

  const isPasswordValid = useMemo(() => password.length >= 8, [password]);
  const isFormValid = isEmailValid && isPasswordValid;

  const handleSubmit = (event) => {
    event.preventDefault();
    setWasSubmitted(true);

    if (!isFormValid) {
      return;
    }

    // En una siguiente iteracion conectamos este payload al backend.
    // eslint-disable-next-line no-console
    console.log({ email, password, rememberMe });
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
    handleSubmit,
  };
}
