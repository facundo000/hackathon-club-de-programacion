import { useState } from 'react';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';

function App() {
  const [authView, setAuthView] = useState('login');

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-12 text-slate-100">
      <main className="mx-auto flex w-full max-w-5xl overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl shadow-slate-950/80">
        <section className="hidden w-1/2 flex-col justify-between bg-gradient-to-br from-indigo-700 via-violet-700 to-fuchsia-700 p-10 lg:flex">
          <div>
            <p className="mb-4 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
              BoardMatch
            </p>
            <h1 className="text-3xl font-bold leading-tight">
              Tu red social para descubrir y jugar juegos de mesa
            </h1>
            <p className="mt-4 max-w-sm text-sm text-violet-100">
              Conecta con personas de tu zona, crea mesas, y encuentra partidas segun tus gustos.
            </p>
          </div>
          <p className="text-sm text-violet-100/90">
            "Cada partida comienza con una buena conexion."
          </p>
        </section>

        <section className="w-full p-6 sm:p-10 lg:w-1/2">
          {authView === 'register' ? (
            <RegisterForm onSwitchToLogin={() => setAuthView('login')} />
          ) : (
            <LoginForm onSwitchToRegister={() => setAuthView('register')} />
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
