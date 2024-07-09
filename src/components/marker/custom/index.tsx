//import libs
import { MarkerClustererF, MarkerF } from "@react-google-maps/api";

type CustomMarkerProps = {
  points: {
    id: number;
    position: google.maps.LatLngLiteral;
    timeStamp: string;
    counter: number;
  }[];
  onMarkerDragEnd: (e: google.maps.MapMouseEvent, id: number) => void;
};

export const CustomMarker = ({
  points,
  onMarkerDragEnd,
}: CustomMarkerProps) => {
  if (points.length < 1) {
    return null;
  }

  return (
    <MarkerClustererF>
      {(clusterer) => (
        <>
          {points.map((point) => (
            <MarkerF
              key={point.id}
              position={point.position}
              label={point.counter.toString()}
              draggable={true}
              clusterer={clusterer}
              onDragEnd={(e) => onMarkerDragEnd(e, point.id)}
            />
          ))}
        </>
      )}
    </MarkerClustererF>
  );
};
