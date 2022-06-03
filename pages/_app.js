import '../styles/globals.css'
import { Navbar } from '../components/Narbar'
import { MoralisProvider } from 'react-moralis'
import { NotificationProvider } from 'web3uikit'

function MyApp({ Component, pageProps }) {
  return (
      <MoralisProvider
        appId="RvyKjlwRrBQohWvAusPJyLQDFQXYB2OI3rOJoonN"
        serverUrl="https://7ugl6xud5zoa.usemoralis.com:2053/server"
      >
        <NotificationProvider>
          <Navbar />
          <div style={{ padding: '100px' }}>
            <Component {...pageProps} />
          </div>
        </NotificationProvider>
      </MoralisProvider>
  )
}

export default MyApp
