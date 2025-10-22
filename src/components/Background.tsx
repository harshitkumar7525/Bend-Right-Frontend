import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useTheme } from "./ThemeProvider";
import Beams from "./ui/Beams";
import Iridescence from "@/components/ui/Iridescence";

const Background = () => {
  const location = useLocation();
  const { theme } = useTheme();

  const background = useMemo(
    () =>
      theme === "dark" ? (
        <Beams
          beamWidth={2}
          beamHeight={15}
          beamNumber={12}
          lightColor="#ffffff"
          speed={2}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={0}
          className="absolute inset-0 z-0"
        />
      ) : (
        <Iridescence
          color={[1, 1, 1]}
          mouseReact={false}
          amplitude={0.1}
          speed={1.0}
          className="absolute inset-0 z-0"
        />
      ),
    [theme]
  );

  const visiblePaths = ["/", "/signin", "/signup"];
  const shouldShowBackground = visiblePaths.includes(location.pathname);

  return (
    shouldShowBackground && (
      <div className="absolute inset-0 -z-10 overflow-hidden">{background}</div>
    )
  );
};

export default Background;
