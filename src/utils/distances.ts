export function getDistanciaMetros(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  var R = 6378.137; //Radio de la tierra en km
  var dLat = rad(lat2 - lat1);
  var dLong = rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(lat1)) *
      Math.cos(rad(lat2)) *
      Math.sin(dLong / 2) *
      Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  //aquí obtienes la distancia en metros por la conversion 1Km =1000m
  var d = R * c;
  return d.toFixed(0);
}
function rad(x: any) {
  return (x * Math.PI) / 180;
}
