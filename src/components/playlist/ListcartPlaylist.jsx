import TrackPlaylistCart from "./TrackPlaylistCart"

const ListcartPlaylist = ({tracks}) => {
  return (
    <section className="max-h-[200px] overflow-y-auto">
        {tracks.map((track) =>( 
            <TrackPlaylistCart key={track.id} track={track}/>
        ))}
    </section>
  )
}

export default ListcartPlaylist