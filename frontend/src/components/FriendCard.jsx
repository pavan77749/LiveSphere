import React from 'react'
import {LANGUAGE_TO_FLAG} from "../constants/index.js"
import { Link } from 'react-router';

const FriendCard = ({friend}) => {
  return (
    <div className='card bg-base-200 hover:shadow-md transition-shadow'>
        <div className="card-body p-4">

            {/* User Info */}
            <div className="flex items-center gap-3 mb-3">
                <div className="avatar size-12">
                    <img src={friend.profilePicture} alt={friend.fullName} />
                </div>
                <h3 className='font-semibold truncate'>{friend.fullName}</h3>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-3">
                <span className='badge badge-secondary text-xs'>
                    {getLanguageFlag(friend.nativeLanguage)}
                    Native: {friend.nativeLanguage}
                </span>
                <span className='badge badge-secondary text-xs'>
                    {getLanguageFlag(friend.learningLanguage)}
                    Learning: {friend.learningLanguage}
                </span>
                 </div>

                <Link className='btn btn-primary btn-sm' to={`/chat/${friend._id}`}>
                Message
                </Link>

        </div>

    </div>
  )
}

export default FriendCard

export function getLanguageFlag(language){
    if(!language) return null;

    const langLower = language.toLowerCase();
    const countryCode = LANGUAGE_TO_FLAG[langLower]; 

    if(countryCode) {
        return (
           <img src={`https://flagcdn.com/${countryCode}.svg`} alt={language} className='w-4 h-4 mr-1 inline-block' />
       )
    }

}