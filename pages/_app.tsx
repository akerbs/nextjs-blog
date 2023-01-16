import "../styles/global.css";
import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

// _app.js— это компонент React верхнего уровня, который упаковывает все страницы вашего приложения.
// Вы можете использовать этот компонент для сохранения состояния при переходе между страницами
// или для добавления глобальных стилей (! только сюда можно импортировать глобальные стили !)

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
