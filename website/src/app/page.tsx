import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/globals.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Clixor - Modern CLI for Project Initialization</title>
        <meta name="description" content="Streamline your project setup with Clixor" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://github.com/Youssefbaghr/Clixor">Clixor</a>
        </h1>

        <p className={styles.description}>
          Streamline your project setup with Clixor - the modern CLI for effortless development
          initialization.
        </p>

        <div className={styles.grid}>
          <Link href="/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Clixor features and API.</p>
          </Link>

          <a href="https://github.com/Youssefbaghr/Clixor" className={styles.card}>
            <h2>GitHub &rarr;</h2>
            <p>Check out the Clixor repository and contribute!</p>
          </a>

          <Link href="/templates" className={styles.card}>
            <h2>Templates &rarr;</h2>
            <p>Explore available project templates.</p>
          </Link>

          <Link href="/about" className={styles.card}>
            <h2>About &rarr;</h2>
            <p>Learn more about the Clixor project and team.</p>
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        <a href="https://github.com/Youssefbaghr/Clixor" target="_blank" rel="noopener noreferrer">
          Powered by Clixor
        </a>
      </footer>
    </div>
  );
}
