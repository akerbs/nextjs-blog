import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from "next/head";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";
import { GetStaticPaths, GetStaticProps } from "next";

export default function Post({
  postData,
}: {
  postData: {
    title: string;
    date: string;
    contentHtml: string;
  };
}) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

// getStaticProps и getStaticPaths запускать только на стороне сервера и никогда не запускать на стороне клиента.
// Более того, эти функции не будут включены в JS-связку для браузера. Это означает, что вы можете писать код,
// например прямые запросы к базе данных, не отправляя их в браузеры.

// Используйте getStaticPaths для получения массива идентификаторов продуктов/постов и
// используйте getStaticProps для получения данных для каждого продукта/поста.

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    // paths содержит массив известных путей, возвращаемых getAllPostIds(), включая параметры, определенные pages/posts/[id].js
    paths,
    // https://nextjs.org/learn/basics/dynamic-routes/dynamic-routes-details
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params.id as string);
  return {
    props: {
      postData,
    },
  };
};
