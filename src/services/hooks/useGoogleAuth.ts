import { useContext } from 'react';
import { GoogleAuthContext } from '../../contexts/GoogleAuthContext'

export function useGoogleAuth() {
  const value = useContext(GoogleAuthContext)

  return value;
}