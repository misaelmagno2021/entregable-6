import { Link } from "react-router-dom"
import { LogoutIcon, PlayIcon, PlaylistIcon } from "../shared/Icons"
import { useUserInfo } from "../../store/userInfo"
import { useState } from "react"
import PopUpPlaylist from "../playlist/PopUpPlaylist"
import { usePlaylistCart } from "../../store/playlistCart"


const PrincipalLayout = ({children}) => {

  const [isShowAuthOptions, setIsShowAuthOptions] = useState(false)
  const [isShowCurrentPlaylist, setIsShowCurrentPlaylist] = useState(false)
  const tracks = usePlaylistCart(store => store.tracks)
  const logout = useUserInfo(state => state.logout)

  return (
    <section className="min-h-screen font-urbanist bg-purple-bg text-white bg-[url(/images/bg-auth-mobile.png)] bg-right-bottom bg-no-repeat sm:bg-[url(/images/bg-auth-desktop.png)] overflow-hidden">
      <header className="flex p-2 justify-between items-center bg-purple-dark sm:text-lg relative">

       <Link to={"/"} className="uppercase font-bold">Gift Music</Link>

       <section className="flex gap-2 [&>button]:uppercase [&>button]:border-[1px] [&>button]:py-1 [&>button]:px-2 [&>button]:text-sm [&>button]:rounded-full [&>button]:font-semibold [&>button]:border-yellow-border">
        <button 
        onClick={() => setIsShowAuthOptions(!isShowAuthOptions)} className="hover:bg-purple-light">Mi cuenta</button>
        <button onClick={() => setIsShowCurrentPlaylist(!isShowCurrentPlaylist)} className="flex gap-3 sm:gap-2 items-center hover:bg-purple-light">
          <PlaylistIcon />          
          <span className="hidden sm:inline">Grabando</span>
          <span>{tracks.length}</span>
        </button>
       </section>

        <article className={`absolute  -bottom-4 translate-y-full grid bg-purple-light p-4 gap-2 rounded-lg border border-y-yellow-border transition-[right] ${isShowAuthOptions ? "right-4" : "-right-full"}`}>
          <Link to={"/playlists"} className="flex  gap-2 items-center bg-purple-light uppercase font-semibold hover:text-yellow-border group">
            <PlayIcon />
            Mis grabaciones
          </Link>
          <button 
          onClick={logout}
          className="flex  gap-2 items-center bg-purple-light uppercase font-semibold hover:text-yellow-border group">
            <LogoutIcon />
            Cerrar sesion
          </button>
        </article>

        <PopUpPlaylist isShowCurrentPlaylist={isShowCurrentPlaylist}/>

      </header>

      <section className="flex justify-center items-center pt-10 px-4">
       {children}
      </section>
    </section>
  )
}

export default PrincipalLayout