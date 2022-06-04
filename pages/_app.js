import '../styles/globals.css'
import { Navbar } from '../components/Navbar'
import { Featured } from '../components/Featured'
import { MoralisProvider } from 'react-moralis'
import { NotificationProvider } from 'web3uikit'

function MyApp({ Component, pageProps }) {
  return (
      <MoralisProvider
        appId="RvyKjlwRrBQohWvAusPJyLQDFQXYB2OI3rOJoonN"
        serverUrl="https://7ugl6xud5zoa.usemoralis.com:2053/server"
      >
        <NotificationProvider>
            <div className="bg-sky-900">
                <div className="container mx-auto">
                    <div className="flex flex-row justify-center">
                        <div className="w-1/3 xs:w-88 xl:w-275 h-screen">
                            <Navbar />
                        </div>
                        <div className="w-full h-screen">
                            <Component {...pageProps} />
                        </div>
                        <div className="hidden md:block w-1/2">
                            <Featured />
                        </div>
                    </div>
                </div>
            </div>
        </NotificationProvider>
      </MoralisProvider>
  )
}

export default MyApp
