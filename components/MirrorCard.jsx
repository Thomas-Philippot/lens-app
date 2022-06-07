import { BiComment, BiPlus, BiShare } from 'react-icons/bi'
import { TbArrowsRightLeft } from 'react-icons/tb'
import React from 'react'

export class MirrorCard extends React.Component {
  render() {
    if (this.props.pub.mirrorOf) {
      if (this.props.pub.mirrorOf.mainPost) {
        return (
            <div className="border-b border-gray-500 mt-1 pb-2 hover:bg-sky-800 w-full break-words cursor-pointer">
              <div className="flex justify-between">
                <div className="w-14 h-full flex mt-2 pl-2 relative">
                  {
                    this.props.pub.profile.picture ? (
                        <img src={this.props.pub.profile.picture.original.url}
                             className="w-12 h-12 rounded-full object-cover"/>
                    ) : (
                        <div className="w-12 h-12 rounded-full bg-gray-700"></div>
                    )
                  }
                </div>
                <div className="w-11/12 mx-2">
                  <div className="font-semibold">{this.props.pub.profile.name}
                    <span className="text-gray-500 font-normal"> @{this.props.pub.profile.handle}</span>
                  </div>
                  <span>{this.props.pub.metadata.content}</span>
                  <div className="w-full rounded-2xl border border-gray-400 my-1 p-2 hover:bg-sky-700">
                    <div className="flex items-center">
                      <div>
                        {
                          this.props.pub.mirrorOf.mainPost.profile.picture ? (
                              <img src={this.props.pub.mirrorOf.mainPost.profile.picture.original.url}
                                   className="w-6 h-6 rounded-full object-cover"/>
                          ) : (
                              <div className="w-6 h-6 rounded-full bg-gray-700"></div>
                          )
                        }
                      </div>
                      <div className="mx-1 font-semibold">{this.props.pub.mirrorOf.mainPost.profile.name}</div>
                      <div className="text-gray-400 text-sm">@{this.props.pub.mirrorOf.mainPost.profile.handle}</div>
                    </div>
                    <div>{this.props.pub.mirrorOf.mainPost.metadata.content}</div>
                    {
                      this.props.pub.mirrorOf.mainPost.metadata.media.length > 0 ? (
                          <img src={this.props.pub.mirrorOf.mainPost.metadata.media[0].original.url}
                               className="w-full h-auto rounded-2xl my-1 p-2 hover:bg-sky-700 object-cover"/>
                      ) : (
                          <div></div>
                      )
                    }
                  </div>
                  <div className="flex items-center mt-2">
                    <div className="flex items-center mr-16 text-gray-400">
                      <BiComment/>
                      <span className="ml-2">{this.props.pub.stats.totalAmountOfComments}</span>
                    </div>
                    <div className="flex items-center mr-16 text-gray-400">
                      <TbArrowsRightLeft/>
                      <span className="ml-2">{this.props.pub.stats.totalAmountOfMirrors}</span>
                    </div>
                    <div className="flex items-center mr-16 text-gray-400">
                      <BiPlus/>
                      <span className="ml-2">{this.props.pub.stats.totalAmountOfCollects}</span>
                    </div>
                    <div className="flex items-center mr-16 text-gray-400">
                      <BiShare/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        )
      }
      return (
          <div className="border-b border-gray-500 mt-1 pb-2 hover:bg-sky-800 w-full break-words cursor-pointer">
            <div className="flex justify-between">
              <div className="w-14 h-full flex pt-5 pl-2 relative">
                <div className="absolute top-0 right-0 pt-1 text-sm text-gray-400">
                  <TbArrowsRightLeft />
                </div>
                {
                  this.props.pub.mirrorOf.profile.picture ? (
                      <img src={this.props.pub.mirrorOf.profile.picture.original.url}
                           className="w-12 h-12 rounded-full object-cover"/>
                  ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-700"></div>
                  )
                }
              </div>
              <div className="w-11/12 px-2">
                <div className="text-gray-400 text-sm">
                  {this.props.pub.profile.name} mirrored this
                </div>
                <div className="font-semibold">{this.props.pub.mirrorOf.profile.name}
                  <span className="text-gray-500 font-normal"> @{this.props.pub.mirrorOf.profile.handle}</span>
                </div>
                <span>{this.props.pub.mirrorOf.metadata.content}</span>
                {
                  this.props.pub.metadata.media.length > 0 ? (
                      <img src={this.props.pub.metadata.media[0].original.url}
                           className="w-full h-auto rounded-2xl my-1 p-2 hover:bg-sky-700 object-cover"/>
                  ) : (
                      <div></div>
                  )
                }
                <div className="flex items-center mt-2">
                  <div className="flex items-center mr-16 text-gray-400">
                    <BiComment/>
                    <span className="ml-2">{this.props.pub.stats.totalAmountOfComments}</span>
                  </div>
                  <div className="flex items-center mr-16 text-gray-400">
                    <TbArrowsRightLeft/>
                    <span className="ml-2">{this.props.pub.stats.totalAmountOfMirrors}</span>
                  </div>
                  <div className="flex items-center mr-16 text-gray-400">
                    <BiPlus/>
                    <span className="ml-2">{this.props.pub.stats.totalAmountOfCollects}</span>
                  </div>
                  <div className="flex items-center mr-16 text-gray-400">
                    <BiShare/>
                  </div>
                </div>
              </div>
            </div>
          </div>
      )
    }
    return (
        <div></div>
    )
  }
}
