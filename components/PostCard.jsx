import { BiComment, BiPlus, BiShare } from 'react-icons/bi'
import { TbArrowsRightLeft } from 'react-icons/tb'
import React from 'react'

export class PostCard extends React.Component {
  render() {
    return (
        <div className="border-b border-gray-500 py-2 px-2 hover:bg-sky-800 w-full break-words cursor-pointer">
          <div className="flex justify-between">
            <div className="w-14 h-full flex pt-1 pl-1">
              {
                this.props.pub.profile.picture ? (
                    <img src={this.props.pub.profile.picture.original.url}
                         className="w-12 h-12 rounded-full object-cover"/>
                ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-700"></div>
                )
              }
            </div>
            <div className="w-11/12 px-2">
              <div className="font-semibold">{this.props.pub.profile.name} <span
                  className="text-gray-500 font-normal">@{this.props.pub.profile.handle}</span></div>
              <span>{this.props.pub.metadata.content}</span>
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
}
