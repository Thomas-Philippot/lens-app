import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { Moralis } from 'moralis'
import { client, getProfiles, doesFollow, getPosts, getMirrors, getComments } from '../../api'
import { Button, Badge, useNotification, NFTBalance } from 'web3uikit'
import { FiArrowLeft } from 'react-icons/fi'
import { FaTwitter } from 'react-icons/fa'
import { TbBell, TbArrowsRightLeft } from 'react-icons/tb'
import { GrLocation } from 'react-icons/gr'
import { PostCard } from '../../components/PostCard'
import { MirrorCard } from '../../components/MirrorCard'
import { CommentCard } from '../../components/CommentCard'
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
  const [pubType, setPubType] = useState('POST')
  const [isLoading, setIsLoading] = useState(false)
  const [tab, setTab] = useState(0)
  const [publications, setPublications] = useState([])
  const {handle} = router.query


  useEffect(() => {
    console.log(profile)
    if (typeof profile !== 'undefined') {
      getPublications(profile.id)
    }
  }, [tab])


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
      await getPublications(id)
      const isFollowing = await client.query(doesFollow, {
        id,
        address: '0x632236009ab5b461B4E7b6AfFb8925630ab66b57'
      }).toPromise()
      setFollowing(isFollowing.data.doesFollow[0].follows)
    } catch (err) {
      console.log(err)
    }
  }

  async function getPublications(id) {
    setIsLoading(true)
    const types = [getPosts, getComments, getMirrors]
    const postType = ['POST', 'COMMENT', 'MIRROR']
    const publicationData = await client.query(types[tab], {id}).toPromise()
    console.log(publicationData)
    await setPublications(publicationData.data.publications.items)
    await setPubType(postType[tab])
    setIsLoading(false)
  }

  function selectPosts() {
    setTab(0)
  }

  function selectComments() {
    setTab(1)
  }

  function selectMirrors() {
    setTab(2)
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
        <div className="flex justify-start items-center px-4 py-1 sticky top-0 bg-sky-900 z-20">
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
                <img className="w-full h-52 object-cover" src={profile.coverPicture.original.url}/>
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
                      <div onClick={follow} className="bg-white text-gray-800 rounded-full px-4 py-1.5 font-semibold">
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
        <div className="flex text-center items-center item-center">
          <div className="flex-1 cursor-pointer hover:bg-sky-800 py-4 relative" onClick={selectPosts}>
            Posts
            {
              pubType === 'POST' ? (
                  <div className="absolute inset-x-16 bottom-0 h-1 bg-green-500 rounded-2xl"></div>
              ) : (<div></div>)
            }
          </div>
          <div className="flex-1 cursor-pointer hover:bg-sky-800 py-4 relative" onClick={selectComments}>
            Comments
            {
              pubType === 'COMMENT' ? (
                  <div className="absolute inset-x-16 bottom-0 h-1 bg-green-500 rounded-2xl"></div>
              ) : (<div></div>)
            }
          </div>
          <div className="flex-1 cursor-pointer hover:bg-sky-800 py-4 relative" onClick={selectMirrors}>
            Mirros
            {
              pubType === 'MIRROR' ? (
                  <div className="absolute inset-x-16 bottom-0 h-1 bg-green-500 rounded-2xl"></div>
              ) : (<div></div>)
            }
          </div>
        </div>
        {
          !isLoading && pubType === 'POST' && publications.map((pub, index) => (
              <PostCard pub={pub} key={index} />
          ))
        }
        {
            !isLoading && pubType === 'COMMENT' && publications.map((pub, index) => (
                <CommentCard pub={pub} key={index} />
            ))
        }
        {
          !isLoading && pubType === 'MIRROR' && publications.map((pub, index) => (
            <MirrorCard pub={pub} key={index} />
          ))
        }
      </div>
  )
}
