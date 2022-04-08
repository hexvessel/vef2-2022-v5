import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from './Components/Layout/Layout'
import User from '../lib/LoginContext' 


function MyApp({ Component, pageProps }: AppProps) {
  return <User><Component {...pageProps} /><Layout/></User>
}

export default MyApp
