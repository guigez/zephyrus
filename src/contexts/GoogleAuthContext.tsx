import Router from "next/router";
import React, { useState } from "react";
import { createContext, ReactNode } from "react";
import { useGoogleLogin } from 'react-use-googlelogin'
import { api } from "../services/api/api";

type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  token: string;
}

type GoogleAuthContextType = {
  user: User | undefined;
  googleBeSignIn: () => boolean;
  googleSignIn: () => Promise<void>;
  googleSignOut: () => Promise<void>;
}

type AuthContextProviderPros = {
  children: ReactNode;
}

export const GoogleAuthContext = React.createContext({} as GoogleAuthContextType) // Not necessary, but recommended.

export const GoogleAuthProvider = (props: AuthContextProviderPros) => {
  const [user, setUser] = useState<User>();

  const googleAuth = useGoogleLogin({
    clientId: "118617181127-18g9g3hek2fgs5aeelf3itj5kql3hpd7.apps.googleusercontent.com", // Your clientID from Google.
  })


  async function googleSignIn() {
    const googleUser = await googleAuth.signIn()

    if (googleUser) {
      const { googleId: id, name, email, imageUrl: avatar } = googleUser.profileObj

      if (!name || !avatar) {
        throw new Error('Missing information from Google Account.');
      }

      const { data } = await api.post('session', { id_google: id, name: name, email: email }, {
        headers: {
          'Content-type': 'application/json',
        }
      });

      const token = data;

      setUser({
        id: id,
        name: name,
        email: email,
        avatar: avatar,
        token: token
      })
    }

  }

  function googleBeSignIn() {
    return googleAuth.isSignedIn
  }

  async function googleSignOut() {
    await googleAuth.signOut();

    setUser(undefined);

  }



  return (
    <GoogleAuthContext.Provider value={{ googleBeSignIn, googleSignIn, googleSignOut, user }}>
      {props.children}
    </GoogleAuthContext.Provider>
  )
}