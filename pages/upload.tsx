import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import axios from 'axios'

import useAuthStore from '../store/authStore'
import { client } from '../utils/client'
import { SanityAssetDocument } from '@sanity/client'

import { topics } from '../utils/constants'
import { BASE_URL } from './../utils/index'
import Head from 'next/head'

const Upload = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [videoAsset, setVideoAsset] = useState<
    SanityAssetDocument | undefined
  >()
  const [wrongFileType, setWrongFileType] = useState(false)
  const [caption, setCaption] = useState('')
  const [category, setCategory] = useState(topics[0].name)
  const [savingPost, setSavingPost] = useState(false)

  const { userProfile }: { userProfile: any } = useAuthStore()

  const router = useRouter()

  const uploadVideo = async (e: any) => {
    setIsLoading(true)
    const selectedFile = e.target.files[0]

    const fileTypes = ['video/mp4', 'video/webm', 'video/ogg']

    if (fileTypes.includes(selectedFile.type)) {
      client.assets
        .upload('file', selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((data) => {
          setVideoAsset(data)
          setIsLoading(false)
        })
    } else {
      setIsLoading(false)
      setWrongFileType(true)
    }
  }
  const handlePost = async () => {
    if (caption && videoAsset?._id && category) {
      setSavingPost(true)

      const document = {
        _type: 'post',
        caption,
        video: {
          _type: 'file',
          asset: {
            _type: 'reference',
            _ref: videoAsset?._id,
          },
        },
        userId: userProfile?._id,
        postedBy: {
          _type: 'postedBy',
          _ref: userProfile?._id,
        },
        topic: category,
      }

      await axios.post(`${BASE_URL}/api/post`, document)

      router.push('/')
    }
  }

  return (
    <>
      <Head>
        <title>TypeTock - Publier</title>
        <meta
          name="description"
          content="Une application Next.js + Typescript, clone de tiktok."
        />
      </Head>
      <div className="flex w-full h-full position:absolute left-0 top-[60px] mb-10 t-10 lg:pt-20 bg-[#f8f8f8] justify-center">
        <div className="bg-white rounded-lg xl:h-[80vh] w-[60%] flex gap-6 flex-wrap justify-between items-center p-14 pt-6">
          <div>
            <div>
              <p className="text-2xl font-bold">Publier une vid??o</p>
              <p className="text-md text-gray-400 mt-1">
                Publie une vid??o sur ton profil
              </p>
            </div>
            <div className="border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 w-[260px] h-[460px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100">
              {isLoading ? (
                <p>Chargement...</p>
              ) : (
                <div>
                  {videoAsset ? (
                    <div>
                      <video
                        src={videoAsset.url}
                        loop
                        controls
                        className="rounded-xl h-[450px] mt-16 bg-black"
                      ></video>
                    </div>
                  ) : (
                    <label className="cursor-pointer">
                      <div className="flex flex-col items-center justify-center h-full">
                        <div className="flex flex-col items-center justify-center">
                          <p className="font-bold text-xl">
                            <FaCloudUploadAlt className="text-gray-300 text-6xl" />
                          </p>
                          <p className="text-xl font-semibold">
                            Publier une vid??o
                          </p>
                        </div>
                        <p className="text-gray-400 text-center mt-10 text-sm leading-10">
                          MP4 ou WebM ou ogg <br /> 720px1280 ou plus <br />
                          10 minutes maximum <br />
                          2GB maximum{' '}
                        </p>
                        <p className="bg-[#f51997] text-center mt-10 rounded text-white text-md font-medium p-2 w-52 outline-none">
                          Choisir un fichier
                        </p>
                      </div>
                      <input
                        type="file"
                        name="upload-video"
                        onChange={uploadVideo}
                        className="w-0 h-0"
                      />
                    </label>
                  )}
                </div>
              )}
              {wrongFileType && (
                <p className="text-center text-xl text-red-400 font-semibold mt-4 [w-250px]">
                  Please select a video file
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-3 pb-10">
            <label className="text-md font-medium">Message</label>
            <input
              className="rounded outline-none text-md border-2 border-gray-200 p-2"
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
            <label className="text-md font-medium">Choisir une cat??gorie</label>
            <select
              className="outline-none border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer"
              onChange={(e) => setCategory(e.target.value)}
            >
              {topics.map((topic) => (
                <option
                  key={topic.name}
                  className="outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300"
                  value={topic.name}
                >
                  {topic.name}
                </option>
              ))}
            </select>
            <div className="flex gap-6 mt-10">
              <button
                onClick={() => {}}
                type="button"
                className="border-gray-300 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none"
              >
                {' '}
                Annuler
              </button>
              <button
                onClick={handlePost}
                type="button"
                className="bg-[#f51997] text-white text-md font-medium p-2 rounded w-28 lg:w-44 outline-none"
              >
                {' '}
                Publier
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Upload
