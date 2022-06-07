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
                <div className="container mx-auto text-white">
                    <div className="flex flex-row justify-center">
                        <div className="w-64 xs:w-88 h-screen">
                            <Navbar />
                        </div>
                        <div className="w-1/2 h-screen pr-10 overflow-auto no-scrollbar">
                            <Component {...pageProps} />
                        </div>
                        <div className="hidden md:block w-1/4 h-screen">
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
