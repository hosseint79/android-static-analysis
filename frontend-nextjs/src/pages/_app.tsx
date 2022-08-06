import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function MyApp({ Component, pageProps }: AppProps) {
  return <>
  <ToastContainer style={{direction:"rtl"}}/>
  <Component {...pageProps} />
  </> 

}

export default MyApp
