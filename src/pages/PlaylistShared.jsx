import { useEffect, useRef, useState } from "react"
import ContainerMusic from "../components/layout/ContainerMusic"
import PublicLayout from "../components/layout/PublicLayout"
import { axiosMusic } from "../config/axios.config"
import {useParams } from "react-router-dom"
import ListPlaylistDetail from "../components/playlistDetail/ListPlaylistDetail"
import { PlusIcon, ShareIcon } from "../components/shared/Icons"
import EmbedTrack from "../components/shared/EmbedTrack"

const PlaylistShared = () => {

  const [playlistInfo, setPlaylistInfo] = useState(null);
  const [isShowSideA, setIsShowSideA] = useState(true);
  const [currentTrack, setCurrentTrack] = useState(null)

  const {id} = useParams()
  const formRef = useRef(null);

  const handleCopyUrl = () => {
    const actualUrl = window.location.href;
    navigator.clipboard.writeText(actualUrl);
    alert("URL copiado al portapapeles")
  }

  useEffect(() => {
    axiosMusic
    .get(`/api/playlists/${id}`) 
    .then(({data}) => setPlaylistInfo(data)) 
    .catch((err) => console.log(err)) 
  },[])

  useEffect(() => {
    if(playlistInfo){
      formRef.current.playlistDetail_title.value = playlistInfo.title
      formRef.current.playlistDetail_to.value = playlistInfo.to
      formRef.current.playlistDetail_message.value = playlistInfo.message
    }
  },[playlistInfo])


  return (
    <PublicLayout>
      <ContainerMusic>
      <form 
        ref={formRef}
        id="formPlaylistCart" 
        className={`relative w-[238px] mx-auto card ${isShowSideA ? "sideA" : "sideB"}`}
      >
        <div className="relative front">
          <img className="mx-auto" src="/images/cassette.png" alt="" />
          <div className="flex items-center gap-2 bg-white absolute top-4 left-6 rounded-md px-2 w-[190px]">
            <input 
              className="text-black bg-transparent outline-none p-1 text-sm flex-1" 
              type="text" 
              placeholder="Titulo"
              size={10}
              name="title"
              required
              id="playlistDetail_title"
              disabled
            />
          </div>
          <button className="absolute right-3 bottom-4 cursor-pointer" >
            <PlusIcon />
          </button>
          <button type="button" onClick={handleCopyUrl} className="absolute right-12 bottom-4 cursor-pointer">
            <ShareIcon />
          </button>
      </div>

      <div className="absolute top-0 left-1 back">
          <img className="mx-auto" src="/images/cassette.png" alt="" />
          <div className="flex items-center gap-2 bg-white absolute top-4 left-6 rounded-md px-2 w-[190px]">
            <input 
              className="text-black bg-transparent outline-none p-1 text-sm flex-1" 
              type="text" 
              placeholder="Para"
              name="to"
              required
              id="playlistDetail_to"
              disabled
            />
          </div>

          <div className="flex items-center gap-2 bg-white absolute top-12 left-6 rounded-md px-2 w-[190px]">
            <textarea 
              className="text-black bg-transparent outline-none p-1 text-sm flex-1 resize-none" 
              rows={4}
              type="text" 
              placeholder="Mensaje"
              name="message"
              required
              id="playlistDetail_message"
              disabled
            />
          </div>
        </div>
      </form>
      
      <button className="max-w-max mx-auto block my-4" onClick={() => setIsShowSideA(!isShowSideA)} >
        {isShowSideA ? "LadoB" : "LadoA"}
      </button>

      {
        currentTrack && <EmbedTrack trackId={currentTrack}/>
      }


      <ListPlaylistDetail 
        setCurrentTrack={setCurrentTrack}
        tracks={playlistInfo?.tracks ?? []}
        showPlayBtn
      />
      </ContainerMusic>
    </PublicLayout>
  )
}

export default PlaylistShared