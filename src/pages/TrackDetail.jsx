import { Link } from "react-router-dom"
import ContainerMusic from "../components/layout/ContainerMusic"

const TrackDetail = () => {
  return (
    <ContainerMusic>
      
      <Link to={-1} className="mb-4 block hover:text-yellow-border">{"<"} Atras</Link>
      <header>TrackDetail</header>
      
    </ContainerMusic>
  )
}

export default TrackDetail