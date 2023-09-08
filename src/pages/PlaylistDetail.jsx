import { Link, useNavigate, useParams } from "react-router-dom"
import ContainerMusic from "../components/layout/ContainerMusic"
import { useEffect, useRef, useState } from "react"
import { axiosMusic } from "../config/axios.config"
import ListPlaylistDetail from "../components/playlistDetail/ListPlaylistDetail"
import { SaveIcon, ShareIcon, TrashIcon } from "../components/shared/Icons"

const PlaylistDetail = () => {

  const [isShowSideA, setIsShowSideA] = useState(true);

  const [playlistInfo, setPlaylistInfo] = useState(null);

  const {id} = useParams();

  const formRef = useRef(null);

  const navigate = useNavigate();

  const handleDeleteTrackByPlaylist = (idTrackToDelete) => {
    axiosMusic
      .delete(`/api/playlists/${playlistInfo.id}/tracks/${idTrackToDelete}`) 
      .then(() => {
        const newTracks = playlistInfo.tracks.filter(track => track.id !== idTrackToDelete)
        setPlaylistInfo({...playlistInfo, tracks: newTracks})
      }) 
      .catch((err) => console.log(err))
  }

  const handleDeletePlaylist = () => {
    axiosMusic
      .delete(`/api/playlists/${id}`)
      .then(({data}) => {
        navigate("/playlists")
      })
      .catch((err) => console.log(err))
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.target))
    axiosMusic
      .patch(`/api/playlists/${id}`, data)
      .then(() => alert("playlist actualizada")) 
      .catch((err) => console.log(err))
  }
  


  useEffect(() => {
    axiosMusic
      .get(`/api/playlists/${id}`)
      .then(({data})=> setPlaylistInfo(data))
      .catch((err)=> console.log(err))
  }, [])

  useEffect(() => {
    if(playlistInfo){
      formRef.current.playlistDetail_title.value = playlistInfo.title
      formRef.current.playlistDetail_to.value = playlistInfo.to
      formRef.current.playlistDetail_message.value = playlistInfo.message
    }
  },[playlistInfo])

  return (
    <ContainerMusic>
      <Link to={-1}>{"<"} Atras </Link>    
      <form 
        onSubmit={handleSubmit} 
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
              onFocus={() => setIsShowSideA(true)}
            />
          </div>
          <Link to={`/playlists/public/${id}`} className="absolute right-4 bottom-4 cursor-pointer" >
            <ShareIcon />
          </Link>

          <button type="submit" className="absolute left-4 bottom-4 cursor-pointer" >
            <SaveIcon />
          </button>

          <button type="button" onClick={handleDeletePlaylist} className="absolute left-14 bottom-4 cursor-pointer" >
            <TrashIcon />
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
              onFocus={() => setIsShowSideA(false)}
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
              onFocus={() => setIsShowSideA(false)}
            />
          </div>
        </div>
      </form>
      <button className="max-w-max mx-auto block my-4" onClick={() => setIsShowSideA(!isShowSideA)} >
        {isShowSideA ? "LadoB" : "LadoA"}
      </button>      
      <ListPlaylistDetail 
        tracks={playlistInfo?.tracks ?? []} handleDeleteTrackByPlaylist={handleDeleteTrackByPlaylist}
        showDeleteBtn
      />    
       
    </ContainerMusic>
  )
}

export default PlaylistDetail