import Head from 'next/head';
import styles from '@/styles/globals.css';

export default function Docs() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Clixor Documentation</title>
        <meta name="description" content="Clixor documentation and usage guide" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Clixor Documentation</h1>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>Installation</h2>
            <p>npm install -g clixor</p>
          </div>

          <div className={styles.card}>
            <h2>Usage</h2>
            <p>clixor init my-project</p>
          </div>

          <div className={styles.card}>
            <h2>Configuration</h2>
            <p>clixor config --set templateDir=/path/to/templates</p>
          </div>

          <div className={styles.card}>
            <h2>Templates</h2>
            <p>clixor template --list</p>
          </div>
        </div>
      </main>
    </div>
  );
}
