import React from 'react'
import axios from 'axios'

import { Video } from './../types.d'
import NoResults from './../components/NoResults'
import VideoCard from './../components/VideoCard'
import { BASE_URL } from './../utils/index'

interface IProps {
  videos: Video[]
}

const Home = ({ videos }: IProps) => {
  return (
    <div className="flex flex-col gap-10 videos h-full">
      {videos.length ? (
        videos.map((video: Video) => <VideoCard post={video} key={video._id} />)
      ) : (
        <NoResults text={'Aucune Videos'} />
      )}
    </div>
  )
}

export const getServerSideProps = async () => {
  const { data } = await axios.get(`${BASE_URL}/api/post`)

  return {
    props: {
      videos: data,
    },
  }
}

export default Home
