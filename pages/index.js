import { useState, useEffect } from 'react'
import {
  client, createProfile, getDefaultProfile, getProfileByOwnedBy, getTimeline, login, sign
} from '../api/api'
import Moralis from 'moralis'
import { useMoralis } from 'react-moralis'
const ethers = Moralis.web3Library
import ls from 'local-storage'
import { PostCard } from '../components/PostCard'
import { CommentCard } from '../components/CommentCard'
import { MirrorCard } from '../components/MirrorCard'

export default function Home() {
  const { isAuthenticated, user, account } = useMoralis();
  const [timeline, setTimeline] = useState([])

  useEffect(() => {
    if (isAuthenticated) {
      fetchProfiles().then(() => {})
    }
  }, [isAuthenticated]);

  async function fetchProfiles() {
    if (isAuthenticated) {
      try {
        if (!ls.get('auth_token')) {
          const challengText = await client.query(sign, {addr: account}).toPromise()
          const provider = await Moralis.enableWeb3()
          const signer = await provider.getSigner()
          const signature = await signer.signMessage(challengText.data.challenge.text)
          const jwt = await client.mutation(login, { addr: account, signature }).toPromise()
          console.log(jwt.data)
          ls.set('auth_token', jwt.data.authenticate.accessToken)
        }
        const profile = await client.query(getProfileByOwnedBy, {ownedBy: account}).toPromise()
        const id = profile.data.profiles.items[0].id
        const response = await client.query(getTimeline, {id}).toPromise()
        console.log(response)
        setTimeline(response.data.timeline.items)
      } catch (err) {
        console.log(err)
      }
    }
  }


  return (
    <div>
      {
        timeline.map((pub, index) => (
          (
              pub.__typename === 'Post' ? (
                  <PostCard pub={pub} key={index} />
              ) : pub.__typename === 'Mirror' ? (
                  <MirrorCard pub={pub} key={index} />
              ) : (
                  <CommentCard pub={pub} key={index} />
              )
          )
        ))
      }
    </div>
  )
}
