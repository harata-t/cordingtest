import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import fetchUserById from '../../libs/users/fetchUserById'
import styles from '../../styles/Home.module.css'

type User = {
  id: string
  name: string
}

export default function Profile(props: { user: User }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to {props.user.name}'s page</h1>
        My ID is {props.user.id}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { uid } = query
  if (typeof uid !== 'string') {
    return {
      notFound: true
    }
  }
  const user = await fetchUserById(uid)
  return {
    props: {
      user
    }
  }
}
