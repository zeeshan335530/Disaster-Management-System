"use client";

import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useNavigate } from "react-router-dom";

// Fix default marker icons in many build setups
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
const DefaultIcon = L.icon({ iconUrl, shadowUrl: iconShadow });
L.Marker.prototype.options.icon = DefaultIcon;

const WEATHER_API_KEY = "ef8aa78c6ea14148a5082033250911"; // replace

function CurrentLocationMarker() {
  const map = useMap();
  useEffect(() => {
    if (!navigator.geolocation) return;
    let marker;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const latlng = [pos.coords.latitude, pos.coords.longitude];
        marker = L.marker(latlng).addTo(map).bindPopup("📍 You are here");
        marker.openPopup();
        map.setView(latlng, 6);
      },
      (err) => console.warn("Geolocation error:", err)
    );
    return () => {
      if (marker) map.removeLayer(marker);
    };
  }, [map]);
  return null;
}

// create colored div icon
function createColoredIcon(color = "green") {
  const html = `<div style="
    background:${color};
    width:18px;
    height:18px;
    display:block;
    left:-9px;
    top:-9px;
    position:relative;
    border-radius:18px;
    border: 2px solid white;
    box-shadow:0 0 4px rgba(0,0,0,0.3)
  "></div>`;
  return L.divIcon({
    html,
    className: "",
    iconSize: [18, 18],
    iconAnchor: [9, 9],
    popupAnchor: [0, -9],
  });
}

export default function DisasterDashboard() {
  const navigate = useNavigate();
  const [earthquakes, setEarthquakes] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [userReports, setUserReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const mapRef = useRef(null);

  // load all sources and refresh periodically
  useEffect(() => {
    const fetchEarthquakes = async () => {
      try {
        const res = await fetch(
          "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
        );
        const data = await res.json();
        const mapped = data.features.map((eq) => ({
          id: eq.id,
          name: eq.properties.place,
          type: "Earthquake",
          mag: eq.properties.mag,
          severity:
            eq.properties.mag >= 5 ? "Severe" : eq.properties.mag >= 3 ? "Moderate" : "Minor",
          position: [eq.geometry.coordinates[1], eq.geometry.coordinates[0]],
          time: new Date(eq.properties.time).toLocaleString(),
        }));
        setEarthquakes(mapped);
      } catch (err) {
        console.error("EQ fetch error:", err);
      }
    };

    const fetchWeather = async () => {
      try {
        const cities = ["New Delhi", "Mumbai", "Kolkata", "Bengaluru"];
        const promises = cities.map(async (city) => {
          const res = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${encodeURIComponent(
              city
            )}&aqi=no`
          );
          const data = await res.json();
          return {
            id: city,
            name: city,
            type: "Weather",
            severity: data.current.condition.text,
            temp: data.current.temp_c,
            position: [data.location.lat, data.location.lon],
            time: data.location.localtime,
          };
        });
        const w = await Promise.all(promises);
        setWeatherData(w);
      } catch (err) {
        console.error("Weather fetch error:", err);
      }
    };

    const loadReports = () => {
      const reports = JSON.parse(localStorage.getItem("reports")) || [];
      setUserReports(reports);
    };

    const runAll = async () => {
      await Promise.all([fetchEarthquakes(), fetchWeather()]);
      loadReports();
      setLoading(false);
    };

    runAll();
    const interval = setInterval(runAll, 300000);
    return () => clearInterval(interval);
  }, []);

  // Combine markers for rendering in map and list
  const combined = [
    ...earthquakes.map((e) => ({ ...e, source: "earthquake" })),
    ...weatherData.map((w) => ({ ...w, source: "weather" })),
    ...userReports.map((r) => ({ ...r, source: "report" })),
  ];

  // Recenter helper: find marker by id (or position) and set view
  const handleCenterTo = (item) => {
    const map = mapRef.current;
    if (!map) return;
    const latlng = item.position;
    if (!latlng) {
      alert("No coordinates available for this alert.");
      return;
    }
    map.setView(latlng, 8);
  };

  // Keep a ref to map instance for programmatic control
  const MapWithRef = ({ children }) => {
    const map = useMap();
    // store ref once
    useEffect(() => {
      if (!mapRef.current) mapRef.current = map;
    }, [map]);
    return children || null;
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-200">
      {/* Left sidebar */}
      <aside className="bg-gray-300 shadow-md p-4 flex-shrink-0 w-full md:w-64">
        <h1 className="text-xl font-bold text-black mb-4">DISASTER MANAGEMENT</h1>
        <nav className="space-y-3">
          <div
            onClick={() => navigate("/home")}
            className="flex items-center space-x-2 cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 text-white 
             px-4 py-2 rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <span>🢀</span>
            <span className="text-black">Home</span>
          </div>
          <div
            onClick={() => navigate("/reports")}
            className="flex items-center space-x-2 cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 text-white 
             px-4 py-2 rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <span>📝</span>
            <span className="text-black">Reports</span>
          </div>
        </nav>
      </aside>

      {/* Map area */}
      <main className="flex-1 p-4 flex flex-col md:flex-row gap-4">
        <div className="flex-1 rounded-lg overflow-hidden" style={{ minHeight: 420 }}>
          <MapContainer
            center={[20.5937, 78.9629]}
            zoom={5}
            scrollWheelZoom
            className="h-[65vh] md:h-[80vh] w-full"
          >
            <MapWithRef />
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; OpenStreetMap contributors'
            />
            <CurrentLocationMarker />

            {/* render markers */}
            {combined.map((it, idx) => {
              const source = it.source;
              let icon;
              if (source === "earthquake") icon = createColoredIcon("#e11d48"); // red
              else if (source === "weather") icon = createColoredIcon("#2563eb"); // blue
              else icon = createColoredIcon("#10b981"); // green for reports

              // Ensure position exists
              const pos = it.position || (it.lat && it.lng ? [it.lat, it.lng] : null);
              if (!pos) return null;

              return (
                <Marker key={`${source}-${it.id || idx}`} position={pos} icon={icon}>
                  <Popup>
                    <div className="text-sm">
                      <strong>{it.name || it.location}</strong>
                      <div>Type: {it.type}</div>
                      {it.source === "weather" && <div>Temp: {it.temp}°C</div>}
                      {it.source === "earthquake" && <div>Magnitude: {it.mag}</div>}
                      {it.source === "report" && it.message && <div>Message: {it.message}</div>}
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>

        {/* Right live alerts panel */}
        <div className="w-full md:w-80 flex flex-col gap-3">
          <div className="bg-gray-300 p-3 rounded shadow">
            <h2 className="font-semibold">Live Alerts</h2>
            <p className="text-xs text-gray-500">Earthquakes · Weather · Reports</p>
          </div>

          <div className="overflow-y-auto bg-gray-300 rounded shadow p-2 max-h-[60vh]">
            {/* Earthquakes */}
            <div className="mb-3">
              <h3 className="text-sm font-semibold text-red-600">Earthquakes</h3>
              {earthquakes.length === 0 && <p className="text-xs text-gray-500">No recent quakes</p>}
              {earthquakes.slice(0, 10).map((e) => (
                <div
                  key={e.id}
                  className="p-2 border-b last:border-b-0 cursor-pointer hover:bg-red-50"
                  onClick={() => handleCenterTo(e)}
                >
                  <div className="flex justify-between">
                    <div className="text-sm font-medium">{e.name}</div>
                    <div className="text-xs text-gray-600">{e.time}</div>
                  </div>
                  <div className="text-xs text-gray-700">Mag: {e.mag} · {e.severity}</div>
                </div>
              ))}
            </div>

            {/* Weather */}
            <div className="mb-3">
              <h3 className="text-sm font-semibold text-blue-600">Weather</h3>
              {weatherData.length === 0 && <p className="text-xs text-gray-500">No weather data</p>}
              {weatherData.map((w) => (
                <div
                  key={w.id}
                  className="p-2 border-b last:border-b-0 cursor-pointer hover:bg-blue-50"
                  onClick={() => handleCenterTo(w)}
                >
                  <div className="flex justify-between">
                    <div className="text-sm font-medium">{w.name}</div>
                    <div className="text-xs text-gray-600">{w.time}</div>
                  </div>
                  <div className="text-xs text-gray-700">{w.severity} · {w.temp}°C</div>
                </div>
              ))}
            </div>

            {/* User Reports */}
            <div>
              <h3 className="text-sm font-semibold text-green-600">User Reports</h3>
              {userReports.length === 0 && <p className="text-xs text-gray-500">No reports</p>}
              {userReports.map((r) => (
                <div
                  key={r.id}
                  className="p-2 border-b last:border-b-0 cursor-pointer hover:bg-green-50"
                  onClick={() => handleCenterTo(r)}
                >
                  <div className="flex justify-between">
                    <div className="text-sm font-medium">{r.type} · {r.location}</div>
                    <div className="text-xs text-gray-600">{r.date}</div>
                  </div>
                  <div className="text-xs text-gray-700">{r.message}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
