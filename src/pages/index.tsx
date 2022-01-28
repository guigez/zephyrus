import type { NextPage } from 'next'
import Head from 'next/head'
import style from '../styles/home.module.scss'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>

      <main>
        <h1 className={style.title}>Hello World</h1>
      </main>
    </div>
  )
}

export default Home
