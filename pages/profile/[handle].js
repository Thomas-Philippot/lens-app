import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { Moralis } from 'moralis'
import { client, getProfiles, getPublications, doesFollow } from '../../api'
import { Button, Badge, useNotification, NFTBalance } from 'web3uikit'
import Image from 'next/image'


// Mainnet
//import ABI from '../../abi.json'
//const address = "0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d"

// testnet
import ABI from '../../testnet-abi.json'
const address = "0x60Ae865ee4C725cd04353b5AAb364553f56ceF82"

export default function Profile() {
  const router = useRouter()
  const notify = useNotification()
  const [profile, setProfile] = useState()
  const [isFollowing, setFollowing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [publications, setPublications] = useState([])
  const {handle} = router.query
  useEffect(() => {
    fetchProfile()
  }, [handle])

  const handleNewNotification = (type, title, message) => {
    notify({
      type,
      message,
      title,
      position: 'bottomR',
    });
  };

  async function fetchProfile() {
    try {
      const response = await client.query(getProfiles, {handle}).toPromise()
      setProfile(response.data.profiles.items[0])
      console.log(profile)
      const id = response.data.profiles.items[0].id
      const publicationData = await client.query(getPublications, {id}).toPromise()
      setPublications(publicationData.data.publications.items)
      const isFollowing = await client.query(doesFollow, {
        id,
        address: '0x632236009ab5b461B4E7b6AfFb8925630ab66b57'
      }).toPromise()
      setFollowing(isFollowing.data.doesFollow[0].follows)
    } catch (err) {
      console.log(err)
    }
  }

  async function follow() {
    const options = {
      contractAddress: address,
      functionName: "follow",
      abi: ABI,
      params: {
        profileIds: [profile.id],
        datas: []
      }
    }
    const ethers = Moralis.web3Library
    const provider = await Moralis.enableWeb3()
    const signer = await provider.getSigner()
    try {
      const contract = new ethers.Contract(
          address,
          ABI,
          signer
      )

      console.log(profile.id)
      const tx = await contract.follow([profile.id], [0x0])
      setIsLoading(true)
      await tx.wait()
      handleNewNotification('success', 'Transaction Success', `Now following ${profile.handle}`)
      setIsLoading(false)
      await fetchProfile()
    } catch (err) {
      console.log(err)
      handleNewNotification('error', 'Transaction failed', err.message)
    }
  }

  if (!profile) return null

  return (
      <div>
        {
          profile.picture ? (
              <Image src={profile.picture.original.url} width="200px" height="200px"/>
          ) : (
              <div style={{width: '60px'}}></div>
          )
        }
        <div>
          <h4>{profile.handle}</h4>
          <p>{profile.bio}</p>
          <p>Total followers : {profile.stats.totalFollowers}</p>
          <p>Following : {profile.stats.totalFollowing}</p>
          {
            isFollowing ? (
                <Button
                    color="green"
                    disabled
                    icon="check"
                    iconLayout="trailing"
                    text="Follwing"
                    theme="primary"
                    type="button"
                />
            ) : (
                <Button
                    id="test-button-primary"
                    onClick={follow}
                    isLoading={isLoading}
                    text="Follow"
                    theme="primary"
                    type="button"
                />
            )
          }
        </div>
        {
          publications.map((pub, index) => (
              <div>
                {pub.metadata.content}
              </div>
          ))
        }
        <NFTBalance
            address={profile.ownedBy}
            chain="eth"
        />
      </div>
  )
}
