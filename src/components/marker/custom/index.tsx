//import libs
import { MarkerClustererF, MarkerF } from "@react-google-maps/api";

import { CustomMarkerProps } from "../../types";

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
