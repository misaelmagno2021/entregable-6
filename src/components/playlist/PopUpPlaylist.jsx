import { useState } from "react"
import "./PopUpPlaylist.css"
import ListcartPlaylist from "./ListcartPlaylist"
import { usePlaylistCart } from "../../store/playlistCart"
import { axiosMusic } from "../../config/axios.config"


const PopUpPlaylist = ({isShowCurrentPlaylist}) => {
  const [isShowSideA, setIsShowSideA] = useState(true)

  const tracks = usePlaylistCart(store => store.tracks)
  const cleanTracks = usePlaylistCart(store => store.cleanTracks)

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.target))
    data.tracks = tracks
    axiosMusic
      .post("/api/playlists", data) 
      .then(() => {
        alert("Playlist creada")
        e.target.reset()
        cleanTracks()
      }) 
      .catch((err) => console.log(err))
  }

  return (
    <article 
      className={`absolute w-[271.6px] z-10 -bottom-4 translate-y-full grid bg-purple-light p-2 gap-2 rounded-lg border border-y-yellow-border transition-[right] ${isShowCurrentPlaylist ? "right-4" : "-right-full"
      }`}
    >
      <form 
        onSubmit={handleSubmit}
        id="formPlaylistCart" 
        className={`relative card ${isShowSideA ? "sideA" : "sideB"}`}
      >
        <div className="relative front">
          <img className="mx-auto" src="/images/cassette.png" alt="" />
          <div className="flex items-center gap-2 bg-white absolute top-4 left-8 rounded-md px-2 w-[190px]">
            <input 
              className="text-black bg-transparent outline-none p-1 text-sm flex-1" 
              type="text" 
              placeholder="Titulo"
              size={10}
              name="title"
              required
              onFocus={() => setIsShowSideA(true)}
            />
          </div>
        </div>

        <div className="absolute top-0 left-1 back">
          <img className="mx-auto" src="/images/cassette.png" alt="" />
          <div className="flex items-center gap-2 bg-white absolute top-4 left-8 rounded-md px-2 w-[190px]">
            <input 
              className="text-black bg-transparent outline-none p-1 text-sm flex-1" 
              type="text" 
              placeholder="Para"
              name="to"
              required
              onFocus={() => setIsShowSideA(false)}
            />
          </div>

          <div className="flex items-center gap-2 bg-white absolute top-12 left-8 rounded-md px-2 w-[190px]">
            <textarea 
              className="text-black bg-transparent outline-none p-1 text-sm flex-1 resize-none" 
              rows={4}
              type="text" 
              placeholder="Mensaje"
              name="message"
              required
              onFocus={() => setIsShowSideA(false)}
            />
          </div>
        </div>
        
        </form>
          <button onClick={() => setIsShowSideA(!isShowSideA)} >
            {isShowSideA ? "LadoB" : "LadoA"}
          </button>
          <section>
            <ListcartPlaylist  tracks={tracks}/>
          </section>
          <button form="formPlaylistCart">Crear</button>
    </article>
  )
}

export default PopUpPlaylist