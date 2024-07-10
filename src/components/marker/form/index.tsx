// import styles
import "./index.css";

import { MarkerFormProps } from "../../types/index";

export const MarkerForm = ({
  markers,
  deleteMarker,
  clearAllMarker,
}: MarkerFormProps) => {
  const markersList = markers.map((marker) => {
    return (
      <li key={marker.id}>
        <p>
          {`
                    marker: ${marker.counter} 
                    lat: ${marker.position.lat} 
                    lng: ${marker.position.lng}
                    timestamp: ${marker.timeStamp}
           `}
        </p>
        <button type="button" onClick={() => deleteMarker(marker.id)}>
          delete marker
        </button>
      </li>
    );
  });

  if (markers.length < 1) {
    return <p className="titleReminder">Please click on map to add marker</p>;
  }

  return (
    <div className="MarkerContainer">
      <ul>{markersList}</ul>

      <button type="button" onClick={clearAllMarker}>
        Clear all markers
      </button>
    </div>
  );
};
