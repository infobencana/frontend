import { useState, useMemo } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import Map, {
  NavigationControl,
  FullscreenControl,
  Marker,
  Popup,
} from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { cn } from "@/utils/cn";

export default function DisasterMap({ data }) {
  const [popupInfo, setPopupInfo] = useState(null);
  const [isLoaded, setLoaded] = useState(false);
  const matches = useMediaQuery("(min-width:1280px)");

  const pin = useMemo(() => {
    if (!(data && isLoaded)) return false;

    return data.map((disaster) => (
      <Marker
        key={`marker-${disaster._id}`}
        longitude={disaster.longitude}
        latitude={disaster.latitude}
        anchor="bottom"
        onClick={(e) => {
          e.originalEvent.stopPropagation();
          setPopupInfo(disaster);
        }}
      >
        <div
          className={cn(
            "w-3 h-3 rounded-full ring-[1px] ring-white relative marker-pulse",
            disaster.status === "waspada"
              ? "marker-pulse-alert bg-[#FF862F]"
              : "marker-pulse-urgent bg-[#dd2323]",
          )}
        ></div>
      </Marker>
    ));
  }, [JSON.stringify(data), isLoaded]);

  return (
    <div className="w-full h-full">
      <Map
        initialViewState={{
          longitude: 112,
          latitude: -0.3,
          zoom: matches ? 4.0 : 2.8,
        }}
        style={{ width: "100%", height: "100%", borderRadius: "4px" }}
        attributionControl={false}
        mapStyle={`https://api.maptiler.com/maps/dataviz-dark/style.json?key=${
          import.meta.env.VITE_MAP_TILER_KEY
        }`}
        onLoad={() => setLoaded(true)}
      >
        {isLoaded ? (
          <>
            {pin}
            <NavigationControl position="bottom-right" visualizePitch />
            <FullscreenControl />

            {popupInfo && (
              <Popup
                anchor="top"
                longitude={Number(popupInfo.longitude)}
                latitude={Number(popupInfo.latitude)}
                onClose={() => setPopupInfo(null)}
                className="animate-in fade-in duration-300 bg-white text-black px-4 pb-3 rounded-md"
              >
                <div className="font-inter font-medium">
                  <p className="leading-5 capitalize">
                    Lokasi : {popupInfo.place}
                  </p>
                  <p className="leading-5 capitalize">
                    Tipe Bencana : {popupInfo.type}
                  </p>
                  <p className="leading-5 capitalize">
                    Status : {popupInfo.status}
                  </p>
                  <p className="leading-5 capitalize">
                    Total Korban : {popupInfo.victim}
                  </p>
                </div>
              </Popup>
            )}
          </>
        ) : (
          false
        )}
      </Map>
    </div>
  );
}
