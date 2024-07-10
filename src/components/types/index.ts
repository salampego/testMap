export type MarkerFormProps = {
  markers: {
    id: number;
    position: google.maps.LatLngLiteral;
    timeStamp: string;
    counter: number;
  }[];
  deleteMarker: (markerId: number) => void;
  clearAllMarker: () => void;
};

export type IMarker = {
  id: number;
  position: google.maps.LatLngLiteral;
  timeStamp: string;
  counter: number;
};

export type CustomMarkerProps = {
  points: {
    id: number;
    position: google.maps.LatLngLiteral;
    timeStamp: string;
    counter: number;
  }[];
  onMarkerDragEnd: (e: google.maps.MapMouseEvent, id: number) => void;
};
