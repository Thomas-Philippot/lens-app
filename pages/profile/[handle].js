import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { Moralis } from 'moralis'
import { client, getProfiles, getPublications, doesFollow } from '../../api'
import { Button, Badge, useNotification, NFTBalance } from 'web3uikit'
import { FiArrowLeft } from 'react-icons/fi'
import { FaTwitter } from 'react-icons/fa'
import { TbBell, TbArrowsRightLeft } from 'react-icons/tb'
import { GrLocation } from 'react-icons/gr'
import { BiEnvelope, BiDotsHorizontalRounded, BiComment, BiPlus, BiShare, BiLink } from 'react-icons/bi'


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
  const [tab, setTab] = useState(1)
  const [publications, setPublications] = useState([])
  const {handle} = router.query

  const isTabOne = tab === 1
  const isTabTwo = tab === 2
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
      console.log(response)
      const id = response.data.profiles.items[0].id
      const publicationData = await client.query(getPublications, {id}).toPromise()
      console.log(publicationData)
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

  function selectComments() {
    setTab(2)
  }

  function selectPosts() {
    setTab(1)
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
      <div className="border-x border-gray-600">
        <div className="flex justify-start items-center px-4 py-1">
          <div className="mr-6 font-semibold text-lg"><FiArrowLeft /></div>
          <div>
            <div className="font-bold text-xl">
              {profile.name}
            </div>
            <div className="text-sm">
              {profile.stats.totalPublications} posts
            </div>
          </div>
        </div>
        <div>
          {
            profile.coverPicture ? (
                <img className="w-full h-52 object-fill" src={profile.coverPicture.original.url}/>
            ) : (
                <div className="w-full h-52 bg-gray-700"></div>
            )
          }
        </div>
        <div className="flex justify-end relative h-20">
          <div className="absolute left-4 bottom-4">
            {
              profile.picture ? (
                  <img src={profile.picture.original.url} className="w-36 h-36 rounded-full object-cover border-4 border-black" />
              ) : (
                  <div style={{width: '60px'}}></div>
              )
            }
          </div>
          <div className="p-4">
            <div className="flex items-center">
              <div className="border border-gray-400 rounded-full text-2xl p-1">
                <BiDotsHorizontalRounded />
              </div>
              <div className="border border-gray-400 rounded-full text-2xl p-1 ml-2">
                <BiEnvelope />
              </div>
              <div className="border border-gray-400 rounded-full text-2xl p-1 ml-2">
                <TbBell />
              </div>
              {
                isFollowing ? (
                    <div className="ml-2">
                      <div className="border border-gray-400 rounded-full px-4 py-1.5 font-semibold">
                        Following
                      </div>
                    </div>
                ) : (
                    <div className="ml-2">
                      <div className="bg-white text-gray-800 rounded-full px-4 py-1.5 font-semibold">
                        Follow
                      </div>
                    </div>
                )
              }
            </div>
          </div>
        </div>
        <div className="px-3 pb-2 border-b border-gray-500">
          <div className="flex flex-col space-y-0 leading-tight">
            <h4 className="text-xl font-bold">{profile.name}</h4>
            <span className="text-gray-500">@{profile.handle}</span>
          </div>
          <p className="py-2">{profile.bio}</p>
          <div className="flex items-center text-gray-400 justify-start mb-2">
            {
              profile.attributes.map((attr, index) => {
                if (attr.key === 'location') {
                  return <div className="mx-1 flex items-center">
                    <GrLocation />
                    <div className="ml-1">{attr.value}</div>
                  </div>
                }
                if (attr.key === 'twitter') {
                  return <div className="mx-1 flex items-center">
                    <FaTwitter />
                    <div className="ml-1">{attr.value}</div>
                  </div>
                }
                if (attr.key === 'website') {
                  return <div className="mx-1 flex items-center">
                    <BiLink />
                    <a href={attr.value} className="ml-1 cursor-pointer hover:underline text-blue-500">{attr.value}</a>
                  </div>
                }
              })
            }
          </div>
          <div className="flex items-center">
            <div className="mr-8">
              <span className="font-semibold">{profile.stats.totalFollowing} </span>
              <span className="text-sm text-gray-400">following</span></div>
            <div>
              <span className="font-semibold">{profile.stats.totalFollowers} </span>
              <span className="text-sm text-gray-400">followers</span>
            </div>
          </div>
        </div>
        <button onClick={selectPosts}>Tab 1</button>
        <button onClick={selectComments}>Tab 2</button>
        {
          isTabOne && publications.map((pub, index) => (
              <div className="border-b border-gray-500 px-3 py-2 hover:bg-sky-800 cursor-pointer">
                <div className="flex">
                  <div className="">
                    <img src={pub.profile.picture.original.url} className="w-12 h-12 rounded-full object-cover" />
                  </div>
                  <div className="w-full pl-4">
                    <div className="font-medium">{pub.profile.name} <span className="text-gray-500 font-normal">@{pub.profile.handle}</span></div>
                    <span>{pub.metadata.content}</span>
                    <div className="flex items-center mt-2">
                      <div className="flex items-center mr-16 text-gray-400">
                        <BiComment />
                        <span className="ml-2">{pub.stats.totalAmountOfComments}</span>
                      </div>
                      <div className="flex items-center mr-16 text-gray-400">
                        <TbArrowsRightLeft />
                        <span className="ml-2">{pub.stats.totalAmountOfMirrors}</span>
                      </div>
                      <div className="flex items-center mr-16 text-gray-400">
                        <BiPlus />
                        <span className="ml-2">{pub.stats.totalAmountOfCollects}</span>
                      </div>
                      <div className="flex items-center mr-16 text-gray-400">
                        <BiShare />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          ))
        }
      </div>
  )
}
