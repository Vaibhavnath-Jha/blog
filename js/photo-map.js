document.addEventListener("DOMContentLoaded", () => {
  const el = document.getElementById("photo-map");
  if (!el) return;

  const photos = JSON.parse(el.dataset.photos || "[]");
  const map = L.map("photo-map").setView([20, 40], 3);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  const bounds = [];

  photos.forEach((p) => {
    const popup = `<img src="${p.thumb || p.image}" alt="">`;

    const photoIcon = L.divIcon({
      className: "emoji-marker",
      html: `📍`,
      iconSize: [20, 20],
      iconAnchor: [15, 15],
      popupAnchor: [0, -15]
    });

    L.marker([p.lat, p.lon], { icon: photoIcon })
      .addTo(map)
      .bindPopup(popup, {
        closeButton: false,      
        className: 'minimal-popup',
        minWidth: 225
      });
      
    bounds.push([p.lat, p.lon]);
  });

  if (bounds.length) {
    map.fitBounds(bounds, { padding: [30, 30] });
  }
});