import { createContext, useContext, useMemo, useState } from 'react';

const INITIAL_PROFILE = {
  name: 'Juan Perez',
  locality: 'Rosario, Santa Fe',
  imageUrl: '',
  favoriteGames: [
    { id: 'f1', title: 'Wingspan', note: 'Estrategia ligera' },
    { id: 'f2', title: 'Terraforming Mars', note: 'Campaña larga' },
    { id: 'f3', title: 'Azul', note: 'Ideal en pareja' },
  ],
  myGames: [
    { id: 'm1', title: 'Gloomhaven', acquired: '2024' },
    { id: 'm2', title: 'Spirit Island', acquired: '2023' },
    { id: 'm3', title: 'Codenames', acquired: '2022' },
    { id: 'm4', title: 'Splendor', acquired: '2022' },
  ],
};

const ProfileContext = createContext(null);

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(INITIAL_PROFILE);

  const value = useMemo(() => ({ profile, setProfile }), [profile]);

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) {
    throw new Error('useProfile debe usarse dentro de ProfileProvider');
  }
  return ctx;
}
