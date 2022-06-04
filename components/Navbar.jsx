import {Row, ConnectButton} from 'web3uikit'
import React from 'react'
import Link from 'next/link'

export const Navbar = () => {
    return (
        <div className="flex flex-col h-screen xl:pr-3 overflow-y-auto w-68 xs:w-88 xl:w-275">
            <Link href="/" className="flex my-2 justify-center items-center xl:justify-start transition duration-350 ease-in-out">
                <a className="mx-6 mt-4">
                    <svg
                        viewBox="0 0 24 24"
                        className="w-8 h-8 text-blue-400 dark:text-white"
                        fill="currentColor"
                    >
                        <g>
                            <path
                                d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"
                            ></path>
                        </g>
                    </svg>
                </a>
            </Link>
            <nav className="m-6">
                <a
                    href="#"
                    className="flex items-center justify-center xl:justify-start text-blue-400 mb-8 transition duration-350 ease-in-out"
                >
                    <svg fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M22.58 7.35L12.475 1.897c-.297-.16-.654-.16-.95 0L1.425 7.35c-.486.264-.667.87-.405 1.356.18.335.525.525.88.525.16 0 .324-.038.475-.12l.734-.396 1.59 11.25c.216 1.214 1.31 2.062 2.66 2.062h9.282c1.35 0 2.444-.848 2.662-2.088l1.588-11.225.737.398c.485.263 1.092.082 1.354-.404.263-.486.08-1.093-.404-1.355zM12 15.435c-1.795 0-3.25-1.455-3.25-3.25s1.455-3.25 3.25-3.25 3.25 1.455 3.25 3.25-1.455 3.25-3.25 3.25z"
                        ></path>
                    </svg>
                    <span className="hidden xl:block ml-4 font-bold text-md">Home</span>
                </a>

                <a
                    href="#"
                    className="flex items-center justify-center xl:justify-start text-white hover:text-blue-400 dark:hover:text-blue-400 mb-8 transition duration-350 ease-in-out"
                >
                    <svg fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 7.337h-3.93l.372-4.272c.036-.412-.27-.775-.682-.812-.417-.03-.776.27-.812.683l-.383 4.4h-6.32l.37-4.27c.037-.413-.27-.776-.68-.813-.42-.03-.777.27-.813.683l-.382 4.4H3.782c-.414 0-.75.337-.75.75s.336.75.75.75H7.61l-.55 6.327H3c-.414 0-.75.336-.75.75s.336.75.75.75h3.93l-.372 4.272c-.036.412.27.775.682.812l.066.003c.385 0 .712-.295.746-.686l.383-4.4h6.32l-.37 4.27c-.036.413.27.776.682.813l.066.003c.385 0 .712-.295.746-.686l.382-4.4h3.957c.413 0 .75-.337.75-.75s-.337-.75-.75-.75H16.39l.55-6.327H21c.414 0 .75-.336.75-.75s-.336-.75-.75-.75zm-6.115 7.826h-6.32l.55-6.326h6.32l-.55 6.326z"
                        ></path>
                    </svg>
                    <span className="hidden xl:block ml-4 font-bold text-md"
                    >Explore</span
                    >
                </a>
            </nav>
            <div className="w-14 xl:w-full mx-auto mt-auto flex flex-row justify-between mb-5 p-2 mb-2">
                <ConnectButton/>
            </div>
        </div>
    )
}
