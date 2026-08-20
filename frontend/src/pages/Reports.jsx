import React, { useState, useEffect } from "react";

// 🌍 Simple geocode function using Nominatim
async function geocodeLocation(location) {
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      location
    )}&limit=1`;
    const res = await fetch(url, {
      headers: {
        "User-Agent": "disaster-management-app/1.0 (your-email@example.com)",
      },
    });
    const data = await res.json();
    if (data && data.length > 0) {
      const lat = parseFloat(data[0].lat);
      const lon = parseFloat(data[0].lon);
      return [lat, lon];
    }
  } catch (err) {
    console.warn("Geocode error:", err);
  }
  return null;
}

export default function Reports() {
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🧾 Load previous reports from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("reports")) || [];
    setReports(stored);
  }, []);

  // 💾 Save reports automatically when changed
  useEffect(() => {
    localStorage.setItem("reports", JSON.stringify(reports));
  }, [reports]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!location || !type || !message)
      return alert("Please fill all required fields!");

    setLoading(true);

    let coords = null;
    // ✅ Use manual coordinates if provided
    if (latitude && longitude) {
      coords = [parseFloat(latitude), parseFloat(longitude)];
    } else {
      // Otherwise try to geocode automatically
      coords = await geocodeLocation(location);
    }

    const newReport = {
      id: Date.now(),
      location,
      type,
      message,
      date: new Date().toLocaleString(),
      position: coords,
    };

    setReports([newReport, ...reports]);
    setLocation("");
    setLatitude("");
    setLongitude("");
    setType("");
    setMessage("");
    setLoading(false);

    alert("✅ Report submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-300 flex flex-col items-center p-6">
      <div className="w-full max-w-3xl bg-gray-200 shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">
          📝 Report an Incident
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Report any nearby disaster or alert to help others stay safe.
        </p>

        {/* 🧭 Form Section */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Location */}
          <div className="sm:col-span-2">
            <label className="block font-medium text-gray-700 mb-1">📍 Location (Auto or Manual)</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Haridwar, Uttarakhand"
              className="w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Type city name for auto-detect OR enter coordinates below.
            </p>
          </div>

          {/* Manual Coordinates */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">📌 Latitude (optional)</label>
            <input
              type="number"
              step="any"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              placeholder="e.g. 29.9457"
              className="w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-1">📌 Longitude (optional)</label>
            <input
              type="number"
              step="any"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              placeholder="e.g. 78.1642"
              className="w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Disaster Type */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">⚠️ Disaster Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Select</option>
              <option value="Flood">Flood</option>
              <option value="Earthquake">Earthquake</option>
              <option value="Fire">Fire</option>
              <option value="Landslide">Landslide</option>
              <option value="Storm">Storm</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Message */}
          <div className="sm:col-span-2">
            <label className="block font-medium text-gray-700 mb-1">🗣️ Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="3"
              placeholder="Describe what’s happening..."
              className="w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-400"
              required
            ></textarea>
          </div>

          {/* Submit */}
          <div className="sm:col-span-2 text-center mt-2">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              {loading ? "Submitting..." : "Submit Report"}
            </button>
          </div>
        </form>
      </div>

      {/* 🔔 Report List */}
      <div className="w-full max-w-3xl mt-8">
        <h2 className="text-xl font-semibold mb-3 text-gray-800">📢 Recent Reports</h2>
        {reports.length === 0 ? (
          <p className="text-gray-500">No reports yet. Be the first to submit one!</p>
        ) : (
          <ul className="space-y-3">
            {reports.map((r) => (
              <li
                key={r.id}
                className="p-4 bg-white rounded-lg shadow-md border border-gray-200"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-blue-600">{r.type}</h3>
                  <span className="text-sm text-gray-500">{r.date}</span>
                </div>
                <p className="text-gray-700">{r.message}</p>
                <p className="text-sm text-gray-500 mt-1">📍 {r.location}</p>
                {r.position ? (
                  <p className="text-xs text-gray-400 mt-1">
                    🧭 Coordinates: {r.position.join(", ")}
                  </p>
                ) : (
                  <p className="text-xs text-gray-400 mt-1">🧭 Coordinates: Not available</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
