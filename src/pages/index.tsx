import { Head } from 'next/document';

import styles from '../styles/home.module.scss';

export default function Home() {
  return (
    <>
    <Head>
       <title>Ignews</title>
      </Head>
     <h1 className={styles.title}>
      Hello World
    </h1>
    </>
  )
}
