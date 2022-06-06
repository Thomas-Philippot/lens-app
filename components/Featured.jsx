import React, {useEffect, useState} from 'react'
import {client, doesFollow, recommendedProfiles} from "../api";

export const Featured = () => {
    const [profiles, setProfiles] = useState([])
    const [followed, setFollowed] = useState([])
    useEffect(() => {
        fetchProfiles().then(() => {})
    }, [])

    async function fetchProfiles() {
        try {
            const response = await client.query(recommendedProfiles).toPromise()
            setProfiles(response.data.recommendedProfiles)
            await isFollowing(response.data.recommendedProfiles)
        } catch (err) {
            console.log(err)
        }
    }

    async function isFollowing(profiles) {
        const followed = []
        for (let profile of profiles) {
            isFollowing = await client.query(doesFollow, {
                id: profile.id,
                address: '0x632236009ab5b461B4E7b6AfFb8925630ab66b57'
            }).toPromise()
            followed[profile.id] = isFollowing.data.doesFollow[0].follows
        }
        setFollowed(followed)
        console.log(followed)
    }

    return (
        <div className="flex flex-col w-290 lg:w-350">
            <div className="relative m-2">
                <div
                    className="absolute text-gray-600 flex items-center p-4 h-full cursor-pointer"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-mail"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path
                            d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"
                        ></path>
                    </svg>
                </div>
                <input
                    className="w-full h-10 bg-cyan-900 border-gray-200 0 text-gray-100 focus:bg-gray-100 focus:outline-none focus:border focus:border-blue-200 font-normal h-9 flex items-center pl-12 text-sm rounded-full border shadow"
                    placeholder="Search Twitter"
                />
            </div>
            <div className="bg-cyan-900 0 rounded-2xl m-2">
                <h1
                    className="text-white text-md font-bold p-3 border-b border-gray-200 "
                >
                    What’s happening
                </h1>
                <div
                    className="text-blue-400 text-sm font-normal p-3 border-b border-gray-200 hover:bg-cyan-800 cursor-pointer transition duration-350 ease-in-out"
                >
                    <h2 className="font-bold text-md text-white">
                        #FreePS5Monday
                    </h2>
                    <p className="text-xs text-gray-400">29.7K Tweets</p>
                </div>
                <div
                    className="text-blue-400 text-sm font-normal p-3 hover:bg-cyan-800 rounded-b-2xl cursor-pointer transition duration-350 ease-in-out"
                >
                    Show more
                </div>
            </div>
            <div className="bg-cyan-900 0 rounded-2xl m-2">
                <h1
                    className="text-white text-md font-bold p-3 border-b border-gray-200 "
                >
                    Who to follow
                </h1>
                {
                    profiles.map((profile, index) => (
                        <div
                            className="text-blue-400 text-sm font-normal p-3 border-b border-gray-200 hover:bg-cyan-800 cursor-pointer transition duration-350 ease-in-out"
                            key={index}
                        >
                            <div className="flex flex-row justify-between p-2">
                                <div className="flex flex-row">
                                    {
                                        profile.picture && profile.picture.original ? (
                                            <img src={profile.picture.original.url} width="40px" height="40px" className="rounded-full object-cover" />
                                        ) : (
                                            <div className="bg-gray-800 rounded-full w-10 h-10"></div>
                                        )
                                    }
                                    <div className="flex flex-col ml-2">
                                        <h1
                                            className="text-white font-bold text-sm"
                                        >
                                            {profile.name}
                                        </h1>
                                        <p className="text-gray-400 text-sm">{profile.handle}</p>
                                    </div>
                                </div>
                                <div>
                                    {
                                        (followed[profile.id]) ? (
                                            <div className="flex items-center h-full text-white">
                                                <a
                                                    href="#"
                                                    className="text-xs font-bold text-white px-4 py-1 rounded-full bg-blue-400"
                                                >Followed</a
                                                >
                                            </div>
                                        ) : (
                                            <div className="flex items-center h-full text-white">
                                                <a
                                                    href="#"
                                                    className="text-xs font-bold text-blue-400 px-4 py-1 rounded-full border-2 border-blue-400"
                                                >Follow</a
                                                >
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
