import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  Polygon,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./MapViewer.css";
import logoImage from "../../assets/logo.png";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { FormSchema, FormData } from "./schema";
import { toBBox } from "../../functions/transform-lat";
import { stacSearch } from "../../http/api";
import { collections } from "../../constants/stac";
import { asyncCatchError } from "../../utils/try-catch";
import { catchError } from "../../utils/normal-catch";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const minimalIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [18, 28], // menor que o padrão
  iconAnchor: [9, 28],
  popupAnchor: [0, -28],
  shadowUrl: "",
});

function MapClickHandler({
  onClick,
}: {
  onClick: (latlng: [number, number]) => void;
}) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      onClick([lat, lng]);
    },
  });
  return null;
}

const MapViewer: React.FC = () => {
  const saoPauloCoords: [number, number] = [-23.55052, -46.633308];

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      startDate: "",
      endDate: "",
      polygon: [],
    },
  });

  const points = watch("polygon");

  const handleMapClick = (coords: [number, number]) => {
    const prev = watch("polygon");
    const updated =
      prev.length >= 4 ? [...prev.slice(1), coords] : [...prev, coords];
    setValue("polygon", updated);
    console.log("Novas coordenadas: " + updated);
  };

  const clearPolygon = () => {
    setValue("polygon", []);
  };

  const onSubmit = async (data: FormData) => {
    const [error, bbox] = catchError(toBBox(data.polygon));

    if(error){
      alert("Erro ao calcular o bounding box: " + error);
      return;
    }

    const { endDate, startDate } = data;
    const endFinalDate = new Date(endDate);
    const startFinalDate = new Date(startDate);

    const datetime = `${startFinalDate.toISOString()}/${endFinalDate.toISOString()}`;

    const finalData = {
      datetime,
      collections,
      bbox,
    };

    console.log("✅ Final STAC payload:", {
      datetime,
      bbox,
      collections,
    });

    const [err, res] = await asyncCatchError(stacSearch(finalData));

    if (err) {
      alert("Erro!" + err);
    }

    console.log(res);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="container">
      <div className="top-bar">
        <img src={logoImage} alt="Logo" className="logo" />
      </div>

      <div className="map-container">
        <div className="map-section">
          <div className="map">
            <MapContainer
              center={saoPauloCoords}
              zoom={10}
              scrollWheelZoom={true}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MapClickHandler onClick={handleMapClick} />
              {points.map((point, index) => (
                <Marker key={index} position={point} icon={minimalIcon} />
              ))}
              {points.length > 2 && (
                <Polygon positions={points} pathOptions={{ color: "lime" }} />
              )}
              {points.length > 0 && (
                <button
                  type="button"
                  className="clear-button"
                  onClick={clearPolygon}
                >
                  Limpar Polígono
                </button>
              )}
            </MapContainer>
          </div>
        </div>

        <aside className="sidebar">
          <h3 className="mb-4 font-semibold text-sm">Filtros por:</h3>

          <label>Data inicial</label>
          <input type="date" {...register("startDate")} />
          {errors.startDate && (
            <span className="error">{errors.startDate.message}</span>
          )}

          <label>Data final</label>
          <input type="date" {...register("endDate")} />
          {errors.endDate && (
            <span className="error">{errors.endDate.message}</span>
          )}

          {errors.polygon && (
            <span className="error">{errors.polygon.message}</span>
          )}

          <button type="button" className="btn-clear" onClick={clearPolygon}>
            Limpar todos
          </button>
          <button type="submit" className="btn-apply">
            Aplicar filtros
          </button>
        </aside>
      </div>
    </form>
  );
};

export default MapViewer;
