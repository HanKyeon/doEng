import React, { useState, useEffect, PropsWithChildren, useRef } from "react"
import { useNavigate } from "react-router-dom"

import { TestWord } from "hooks/queries/queries"
import { useDispatch } from "react-redux"
import {} from "store/wordTestSlice"
import wordKorean from "assets/images/wordKorean.png"
import wordListen from "assets/images/wordListen.png"
import wordTestBar from "assets/images/wordTestBar.png"
import WordTestClose from "assets/images/DetailClose.png"
import CommonLoading from "components/UI/CommonLoading"

interface Props {
  wordInfo: TestWord
  handleResponse: (response: boolean) => void
}

function WordTestItem({ wordInfo, handleResponse }: PropsWithChildren<Props>) {
  const [wordAudio, setWordAudio] = useState<HTMLAudioElement | null>(null)
  const wordAudioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isEnglishPlaying, setIsEnglishPlaying] = useState(false)
  const [isKoreanPlaying, setIsKoreanPlaying] = useState(false)
  const englishAudio = new Audio(wordInfo.voice)
  const koreanAudio = new Audio(wordInfo.korVoice)
  // const audio = new Audio(wordInfo.voice)
  const navigate = useNavigate()
  const [imageSrc, setImageSrc] = useState<string>("")

  const handleImageClick = (src: string) => {
    if (src === wordInfo.image) {
      handleResponse(true)
    } else {
      handleResponse(false)
    }
  }

  // audio.onended = () => setIsPlaying(false)
  englishAudio.onended = () => setIsEnglishPlaying(false)
  koreanAudio.onended = () => setIsKoreanPlaying(false)

  useEffect(() => {
    let selectedSrc = Math.random() < 0.5 ? wordInfo.image : wordInfo.wrongImage
    if (selectedSrc === wordInfo.image && selectedSrc === wordInfo.wrongImage) {
      selectedSrc =
        selectedSrc === wordInfo.image ? wordInfo.wrongImage : wordInfo.image
    }

    setImageSrc(selectedSrc)
  }, [wordInfo.image, wordInfo.wrongImage])

  useEffect(() => {
    setIsPlaying(true)
    englishAudio.play()
  }, [wordInfo.voice])

  useEffect(() => {
    if (isEnglishPlaying) {
      englishAudio.play()
      setIsPlaying(true)
    } else if (isKoreanPlaying) {
      koreanAudio.play()
      setIsPlaying(true)
    } else {
      setIsPlaying(false)
    }
  }, [isEnglishPlaying, isKoreanPlaying])

  const handleEnglishClick = () => {
    setIsEnglishPlaying(true)
    setIsKoreanPlaying(false)
  }

  const handleKoreanClick = () => {
    setIsKoreanPlaying(true)
    setIsEnglishPlaying(false)
  }

  const handleTestClose = function () {
    navigate("/playtale")
  }

  if (!wordInfo) {
    return <CommonLoading />
  }

  return (
    <>
      <img
        alt="테스트 종료"
        src={WordTestClose}
        className=" z-40 fixed top-[11%] h-[15%] w-[10%] ml-[76%] cursor-pointer"
        onClick={handleTestClose}
      />
      <div className="z-30 fixed top-[28%] text-[250%] text-orange-900  ml-[35%]">
        {wordInfo.engWord}
      </div>
      <div className="z-30 fixed w-[7%] h-[7%] top-[28%] ml-[51%]">
        <img
          src={wordListen}
          className="cursor-pointer"
          onClick={handleEnglishClick}
        />
      </div>
      <div className="z-30 fixed w-[7%] h-[7%] top-[28%] ml-[60%]">
        <img
          src={wordKorean}
          className="cursor-pointer"
          onClick={handleKoreanClick}
        />
      </div>
      <div className="z-30 fixed w-[40%] h-[40%] top-[78%] ml-[30%]">
        <img src={wordTestBar} />
      </div>

      <div className="grid grid-cols-2 fixed w-[75%] bottom-[13%] ml-[12%] scr">
        <img
          src={imageSrc}
          onClick={() => handleImageClick(imageSrc)}
          className="cursor-pointer"
        />
        <img
          src={
            imageSrc === wordInfo.image ? wordInfo.wrongImage : wordInfo.image
          }
          onClick={() =>
            handleImageClick(
              imageSrc === wordInfo.image
                ? wordInfo.wrongImage
                : wordInfo.image,
            )
          }
          className="cursor-pointer"
        />
      </div>
    </>
  )
}

export default WordTestItem
