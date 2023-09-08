import { Link } from "react-router-dom"
import { AddIcon, PlayIcon2 } from "./Icons"
import { usePlaylistCart} from "../../store/playlistCart"

const TrackDefaultCard = ({track}) => {
    const addTrack = usePlaylistCart(store => store.addTrack)

    return (
        <article className="flex items-center gap-2 hover:bg-white/30 p-1 rounded-md pr-2 transition-colors"> 
            <header className="rounded-md overflow-hidden">
                <img src={track.album.images[2].url} alt="" />
            </header>
            <section className="flex-1">
                <Link to={`/tracks/${track.id}`} className="font-semibold line-clamp-1">{track.name}</Link>
                <Link to={`/artists/${track.artists[0].id}`} className="text-slate-499 font-light line-clamp-1">{track.artists[0].name}</Link>
            </section>
            <section className="flex items-center gap-2">
                <button className="group">
                    <PlayIcon2 />
                </button>
                <button onClick={() => addTrack(track)} className="group">
                    <AddIcon />
                </button>
            </section>
        </article>
    )
}
export default TrackDefaultCard