import React, { useState, useEffect } from "react";

const API_URL =
  "https://disaster-management-backend-6lkz.onrender.com/api/reports";

// 🌍 Geocode location using Nominatim
async function geocodeLocation(location) {
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      location
    )}&limit=1`;

    const res = await fetch(url, {
      headers: {
        "User-Agent": "disaster-management-app/1.0",
      },
    });

    const data = await res.json();

    if (data && data.length > 0) {
      return {
        latitude: parseFloat(data[0].lat),
        longitude: parseFloat(data[0].lon),
      };
    }
  } catch (err) {
    console.error("Geocode error:", err);
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
  const [loadingReports, setLoadingReports] = useState(true);

  // =========================================================
  // LOAD REPORTS FROM MONGODB THROUGH RENDER BACKEND
  // =========================================================
  useEffect(() => {
    const loadReports = async () => {
      try {
        const res = await fetch(API_URL);

        if (!res.ok) {
          throw new Error("Failed to fetch reports");
        }

        const data = await res.json();
        setReports(data);
      } catch (err) {
        console.error("Error loading reports:", err);
        alert("Unable to load reports from the server.");
      } finally {
        setLoadingReports(false);
      }
    };

    loadReports();
  }, []);

  // =========================================================
  // SUBMIT REPORT TO MONGODB
  // =========================================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!location || !type || !message) {
      alert("Please fill all required fields!");
      return;
    }

    setLoading(true);

    try {
      let coords = null;

      // Use manually entered coordinates
      if (latitude && longitude) {
        coords = {
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
        };
      } else {
        // Automatically find coordinates
        coords = await geocodeLocation(location);
      }

      const reportData = {
        disasterType: type,
        location: location,
        description: message,
        latitude: coords ? coords.latitude : null,
        longitude: coords ? coords.longitude : null,
      };

      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reportData),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to submit report");
      }

      const savedReport = await res.json();

      // Add newly saved report to the top of the list
      setReports((prevReports) => [savedReport, ...prevReports]);

      // Clear form
      setLocation("");
      setLatitude("");
      setLongitude("");
      setType("");
      setMessage("");

      alert("✅ Report submitted successfully!");
    } catch (err) {
      console.error("Submit report error:", err);
      alert("❌ Failed to submit report. Please try again.");
    } finally {
      setLoading(false);
    }
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

        {/* =====================================================
            REPORT FORM
        ===================================================== */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        >

          {/* Location */}
          <div className="sm:col-span-2">
            <label className="block font-medium text-gray-700 mb-1">
              📍 Location
            </label>

            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Delhi, India"
              className="w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-400"
              required
            />

            <p className="text-xs text-gray-500 mt-1">
              Enter a city/location or provide coordinates below.
            </p>
          </div>

          {/* Latitude */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              📌 Latitude (optional)
            </label>

            <input
              type="number"
              step="any"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              placeholder="e.g. 28.6139"
              className="w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Longitude */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              📌 Longitude (optional)
            </label>

            <input
              type="number"
              step="any"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              placeholder="e.g. 77.2090"
              className="w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Disaster Type */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              ⚠️ Disaster Type
            </label>

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
            <label className="block font-medium text-gray-700 mb-1">
              🗣️ Message
            </label>

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="3"
              placeholder="Describe what's happening..."
              className="w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Submit */}
          <div className="sm:col-span-2 text-center mt-2">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit Report"}
            </button>
          </div>
        </form>
      </div>

      {/* =====================================================
          REPORT LIST
      ===================================================== */}
      <div className="w-full max-w-3xl mt-8">

        <h2 className="text-xl font-semibold mb-3 text-gray-800">
          📢 Recent Reports
        </h2>

        {loadingReports ? (
          <p className="text-gray-500">
            Loading reports...
          </p>
        ) : reports.length === 0 ? (
          <p className="text-gray-500">
            No reports yet. Be the first to submit one!
          </p>
        ) : (
          <ul className="space-y-3">

            {reports.map((r) => (
              <li
                key={r._id}
                className="p-4 bg-white rounded-lg shadow-md border border-gray-200"
              >

                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-blue-600">
                    {r.disasterType}
                  </h3>

                  <span className="text-sm text-gray-500">
                    {r.date
                      ? new Date(r.date).toLocaleString()
                      : "Date unavailable"}
                  </span>
                </div>

                <p className="text-gray-700 mt-2">
                  {r.description}
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  📍 {r.location}
                </p>

                {r.latitude != null && r.longitude != null ? (
                  <p className="text-xs text-gray-400 mt-1">
                    🧭 Coordinates: {r.latitude}, {r.longitude}
                  </p>
                ) : (
                  <p className="text-xs text-gray-400 mt-1">
                    🧭 Coordinates: Not available
                  </p>
                )}

              </li>
            ))}

          </ul>
        )}
      </div>
    </div>
  );
}