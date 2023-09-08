import { Link } from "react-router-dom"



const PlaylistCard = ({playlist, index}) => {

  const topDistance = index*50

  return (
    
    <Link to={`/playlists/${playlist.id}`} className="absolute front transition-transform hover:rotate-3 hover:-translate-y-4 cursor-pointer" style={{top: `${topDistance}px`}}>
        <img className="mx-auto" src="/images/cassette.png" alt="" />
        <div className="flex items-center gap-2 bg-white absolute top-5 left-6 rounded-md px-2 w-[210px]">
            <h3 className="text-black text-sm flex-1 line-clamp-1">{playlist.title}</h3>
        </div>
    </Link>  
    
  )
}

export default PlaylistCard