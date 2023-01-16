// @ts-nocheck
import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";
import { GetStaticProps } from "next";

import { useSession, signIn, signOut } from "next-auth/react";

export default function Home({
  allPostsData,
}: {
  allPostsData: {
    date: string;
    title: string;
    id: string;
  }[];
}) {
  const { data: session } = useSession();
  console.log("allPostsData", allPostsData);
  console.log("session", session);

  if (session) {
    return (
      <Layout home>
        <Head>
          <title>{siteTitle}</title>
        </Head>
        <section>
          Signed in as {session.user.name} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </section>

        <section className={utilStyles.headingMd}>
          <p>[Your Self Introduction]</p>
          <p>
            (This is a sample website - you’ll be building a site like this on{" "}
            <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
          </p>
        </section>

        {/* Add this <section> tag below the existing <section> tag */}
        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <h2 className={utilStyles.headingLg}>Blog</h2>
          <ul className={utilStyles.list}>
            {allPostsData.map(({ id, date, title }) => (
              <li className={utilStyles.listItem} key={id}>
                <Link href={`/posts/${id}`}>{title}</Link>
                <br />
                <small className={utilStyles.lightText}>
                  <Date dateString={date} />
                </small>
              </li>
            ))}
          </ul>
        </section>
      </Layout>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}

// работает getStaticPropsтолько на стороне сервера . Он никогда не будет работать на стороне клиента.
// Он даже не будет включен в комплект JS для браузера. Это означает, что вы можете писать код,
// такой как прямые запросы к базе данных, без их отправки в браузеры.

// getStaticPropsможно экспортировать только со страницы . Вы не можете экспортировать его из нестраничных файлов. Одна из причин
// этого ограничения заключается в том, что React должен иметь все необходимые данные до того, как страница будет отображена.
// https://nextjs.org/learn/basics/data-fetching/getstaticprops-details

export const getStaticProps: GetStaticProps = () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};
