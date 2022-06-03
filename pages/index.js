import { useState, useEffect } from 'react'
import {
  client, recommendedProfiles
} from '../api'
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  const [profiles, setProfiles] = useState([])
  useEffect(() => {
    fetchProfiles()
  }, [])

  async function fetchProfiles() {
    try {
      const response = await client.query(recommendedProfiles).toPromise()
      console.log(response)
      setProfiles(response.data.recommendedProfiles)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div>
      {
        profiles.map((profile, index) => (
          <Link href={`/profile/${profile.handle}`}>
            <div className="py-2">
              <div className="rounded-xl border border-black cursor-pointer px-2 pt-2">
                {
                  profile.picture && profile.picture.original ? (
                      <Image src={profile.picture.original.url} width="60px" height="60px" className="rounded-xl" />
                  ) : (
                      <div style={{ width: '60px', backgroundColor: 'black' }}></div>
                  )
                }
                <h4 className="text-3xl font-bold">{ profile.name || profile.handle }</h4>
                <p>{ profile.bio }</p>
              </div>
            </div>
          </Link>
        ))
      }
    </div>
  )
}
