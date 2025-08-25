import React from "react"
import ReactCardFlip from 'react-card-flip'

const FlashCardItem = ({ isFlipped, handleClick, flashcard }) => {
  return (
    <div className="flex items-center justify-center">
      <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
        <div 
          className="p-4 bg-primary text-white flex items-center shadow-lg justify-center rounded-lg cursor-pointer h-[250px] w-[250px] md:h-[350px] md:w-[350px]"
          onClick={handleClick}
        >
          <h2 className="text-center text-lg md:text-xl">{flashcard?.front}</h2>
        </div>

        <div 
          className="p-4 bg-white shadow-lg text-primary flex items-center justify-center rounded-lg cursor-pointer h-[250px] w-[250px] md:h-[350px] md:w-[350px]"
          onClick={handleClick}
        >
          <h2 className="text-center text-lg md:text-xl">{flashcard?.back}</h2>
        </div>
      </ReactCardFlip>
    </div>
  )
}

export default FlashCardItem