import { useEffect, useState } from "react";
import moment from "moment";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { ref, set, getDatabase, push, onValue } from "firebase/database";

import { CustomMarker } from "../marker/custom";
import { MarkerForm } from "../marker/form";
import { db } from "../../firebase";

type IMarker = {
  id: number;
  position: google.maps.LatLngLiteral;
  timeStamp: string;
  counter: number;
};

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 49.842957,
  lng: 24.031111,
};

export const MapComponent = () => {
  const [markers, setMarkers] = useState<IMarker[]>([]);

  useEffect(() => {
    const dbRef = ref(getDatabase(), "markers");
    onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setMarkers(Object.values(data).map((item) => item as IMarker));
      } else {
        console.log("No data available");
      }
    });
  }, []);

  useEffect(() => {
    if (markers.length > 0) {
      set(ref(db, "markers"), markers);
    }
  }, [markers]);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  });

  const onMapClick = async (e: google.maps.MapMouseEvent) => {
    const latLng = e.latLng;
    const newCounter = markers.length === 0 ? 1 : markers.length + 1;

    if (latLng) {
      const newMarker: IMarker = {
        id: Date.now(),
        counter: newCounter,
        position: { lat: latLng.lat(), lng: latLng.lng() },
        timeStamp: moment().format("llll"),
      };

      setMarkers((prevState) => [...prevState, newMarker]);
      const newMarkerRef = push(ref(db, "markers"));
      await set(newMarkerRef, newMarker);
    }
  };

  const onMarkerDragEnd = (e: google.maps.MapMouseEvent, id: number) => {
    const latLng = e.latLng;
    if (latLng) {
      const updatedMarkers = markers.map((marker) =>
        marker.id === id
          ? {
              ...marker,
              position: { lat: latLng.lat(), lng: latLng.lng() },
            }
          : marker
      );
      setMarkers(updatedMarkers);
      set(ref(db, `markers/${id}`), {
        ...updatedMarkers.find((marker) => marker.id !== id),
      });
    }
  };

  const deleteMarker = async (markerId: number) => {
    const updatedMarkers = markers.filter(({ id }) => markerId !== id);
    setMarkers(updatedMarkers);
    await set(ref(db, `markers`), updatedMarkers);
  };

  const clearAllMarkers = () => {
    setMarkers([]);
    set(ref(db, "markers"), null);
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onClick={(e) => onMapClick(e)}
      >
        <CustomMarker points={markers} onMarkerDragEnd={onMarkerDragEnd} />
      </GoogleMap>
      <MarkerForm
        markers={markers}
        deleteMarker={deleteMarker}
        clearAllMarker={clearAllMarkers}
      />
    </>
  );
};
