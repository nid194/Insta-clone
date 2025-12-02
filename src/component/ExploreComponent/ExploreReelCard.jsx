import React from 'react'

const ExploreReelCard = ({reel}) => {
  return (
    <div className="relative group cursor-pointer overflow-hidden rounded-lg shadow-sm aspect-square mt-1">
      <video
        src={reel?.videoUrl}
        controls
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"/>
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
        <div className="flex space-x-6 text-white font-semibold">
          <span>❤️ {reel.userLikedReel?.length || 0}</span>
          <span>💬 {reel.comments?.length || 0}</span>
        </div>
      </div>
    </div>
  )
}

export default ExploreReelCard