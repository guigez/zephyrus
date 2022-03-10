import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useContext } from 'react'

import background from '../../public/Background.svg'
import googleIcon from '../../public/GoogleIcon.svg'
import { GoogleAuthContext } from '../contexts/GoogleAuthContext'


import styles from '../styles/home.module.scss'

const Home: NextPage = () => {
  const { googleSignIn } = useContext(GoogleAuthContext)

  async function handleSignIn() {
    const user = await googleSignIn();
    console.log(user)
  }

  return (
    <>
      <Head>
        <title>Zephyrus</title>
      </Head>

      <div className={styles.container}>
        <aside>
          <Image className={styles.background} src={background} alt="Rocket with background blue" />
        </aside>

        <main>
          <div className={styles.login}>
            <button onClick={handleSignIn} className={styles.buttonGoogle}>
              <Image className={styles.googleIcon} height={100} src={googleIcon} alt="Google Icon" />
              <span>Log in with Google</span>
            </button>
          </div>
        </main>
      </div>
    </>
  )
}

export default Home
