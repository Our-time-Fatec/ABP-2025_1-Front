export function toBBox(points: [number, number][]): [number, number, number, number] {
  if (points.length === 0) {
    throw new Error("O array de coordenadas está vazio");
  }

  const lats = points.map(([lat]) => lat);
  const lngs = points.map(([, lng]) => lng);

  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);

  return [minLng, minLat, maxLng, maxLat];
}
