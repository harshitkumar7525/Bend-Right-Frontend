import { homeImagesData } from "@/utils/imageData.ts"
import Masonry from "../ui/Masonry.tsx"

const HomeBackground = () => {
  return (
    <>
    <Masonry
        items={homeImagesData}
        ease="power3.out"
        duration={0.6}
        stagger={0.05}
        animateFrom="bottom"
        scaleOnHover={true}
        hoverScale={0.95}
        blurToFocus={true}
        colorShiftOnHover={false}
      />
    </>
  )
}

export default HomeBackground