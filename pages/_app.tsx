import "../styles/global.css";
import { AppProps } from "next/app";

// _app.js— это компонент React верхнего уровня, который упаковывает все страницы вашего приложения.
// Вы можете использовать этот компонент для сохранения состояния при переходе между страницами
// или для добавления глобальных стилей (! только сюда можно импортировать глобальные стили !)

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
