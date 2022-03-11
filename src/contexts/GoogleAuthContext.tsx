import Router from "next/router";
import React, { useState } from "react";
import { createContext, ReactNode } from "react";
import { useGoogleLogin } from 'react-use-googlelogin'

type User = {
  id: string | undefined,
  name: string | undefined,
  email: string | undefined,
  avatar: string | undefined
}

type GoogleAuthContextType = {
  user: User | undefined
  googleAuth: any,
  googleSignIn: () => Promise<void>
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

    setUser({
      id: googleUser?.profileObj?.googleId,
      name: googleUser?.profileObj?.name,
      email: googleUser?.profileObj?.email,
      avatar: googleUser?.profileObj?.imageUrl
    })

    Router.push('/dashboard');
  }


  return (
    <GoogleAuthContext.Provider value={{ googleAuth, googleSignIn, user }}>
      {props.children}
    </GoogleAuthContext.Provider>
  )
}