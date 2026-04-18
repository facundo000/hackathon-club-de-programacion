import { useMemo, useState } from 'react';

export function useRegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [wasSubmitted, setWasSubmitted] = useState(false);

  const isEmailValid = useMemo(() => {
    if (!email) {
      return false;
    }

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }, [email]);

  const isPasswordValid = useMemo(() => password.length >= 8, [password]);
  const passwordsMatch = useMemo(
    () => password === confirmPassword && confirmPassword.length > 0,
    [password, confirmPassword],
  );

  const isFormValid = isEmailValid && isPasswordValid && passwordsMatch;

  const handleSubmit = (event) => {
    event.preventDefault();
    setWasSubmitted(true);

    if (!isFormValid) {
      return;
    }

    // Aqui hacemos la llamada a la API para registrar el usuario.
    // En una siguiente iteracion conectamos este payload al backend.
    // eslint-disable-next-line no-console
    console.log({ email, password });
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    wasSubmitted,
    isEmailValid,
    isPasswordValid,
    passwordsMatch,
    isFormValid,
    handleSubmit,
  };
}
