import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'

import background from '../../public/Background.svg'
import googleIcon from '../../public/GoogleIcon.svg'
import { useGoogleAuth } from '../services/hooks/useGoogleAuth'



import styles from '../styles/home.module.scss'

const Home: NextPage = () => {
  const router = useRouter();
  const { user, googleSignIn, googleBeSignIn } = useGoogleAuth();

  async function handleSignIn() {
    if (googleBeSignIn) {
      await googleSignIn();
    }

    router.push('/dashboard')
  }

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
