import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

import background from '../../public/Background.svg'
import googleIcon from '../../public/GoogleIcon.svg'

import { signIn, useSession } from 'next-auth/react'

import styles from '../styles/home.module.scss'
import router from 'next/router'
import { useEffect } from 'react'



const Home: NextPage = () => {
  const { data: session } = useSession()

  useEffect(() => {
    if (session) {

      router.push('/dashboard')
    }
  }, [session])

  return (
    <>
      <Head>
        <title>Zephyrus</title>
      </Head>

      <div className={styles.container}>
        <aside>
          <Image className={styles.background} src={background} alt="Rocket with blue background" />
        </aside>

        <main>
          <div className={styles.login}>
            <button onClick={() => signIn('google')} className={styles.buttonGoogle}>
              <Image className={styles.googleIcon} height={100} src={googleIcon} alt="Google Icon" />
              <span>Log in with Google</span>
            </button>
          </div>
        </main>
      </div >
    </>
  )
}

export default Home
