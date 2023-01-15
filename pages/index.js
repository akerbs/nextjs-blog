// @ts-nocheck
import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import styles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";

export default function Home({ allPostsData }) {
  console.log("allPostsData", allPostsData);
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={styles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{" "}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>

      {/* Add this <section> tag below the existing <section> tag */}
      <section className={`${styles.headingMd} ${styles.padding1px}`}>
        <h2 className={styles.headingLg}>Blog</h2>
        <ul className={styles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={styles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={styles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

// работает getStaticPropsтолько на стороне сервера . Он никогда не будет работать на стороне клиента.
// Он даже не будет включен в комплект JS для браузера. Это означает, что вы можете писать код,
// такой как прямые запросы к базе данных, без их отправки в браузеры.

// getStaticPropsможно экспортировать только со страницы . Вы не можете экспортировать его из нестраничных файлов. Одна из причин
// этого ограничения заключается в том, что React должен иметь все необходимые данные до того, как страница будет отображена.
// https://nextjs.org/learn/basics/data-fetching/getstaticprops-details

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
