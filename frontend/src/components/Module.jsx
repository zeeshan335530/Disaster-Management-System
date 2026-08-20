import React from "react";
import earthquakePDF from "../assets/earthquake.pdf";
import fireSafetyPDF from "../assets/Fire_Safety.pdf";
import earthquakeThumb from "../assets/thumb.jpg";
import fireSafetyThumb from "../assets/thumb.jpg";
import floodThumb from "../assets/flood_thumb.jpg";

export default function Module() {
  return (
    <section id="module" className="max-w-6xl mx-auto px-4 py-12">
      <header className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-semibold text-blue-500">Free Modules for Students</h2>
        <hr className="w-10 h-1 bg-blue-500 mx-auto mt-2" />
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          Interactive PDF and video modules for students of all age groups, from Nursery to College.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 place-items-center ">
        {/* PDF Card - Earthquake */}
        <article className="bg-gray-100 hover:scale-105 hover:shadow-2xl rounded-2xl shadow-md flex flex-col justify-between w-full max-w-sm h-[430px]">
          <div>
            <img src={earthquakeThumb} alt="Earthquake Safety" className="w-full h-48 object-cover rounded-t-2xl" />

            <div className="p-4">
              <h3 className="text-xl font-medium text-center">Earthquake Safety Basics</h3>
              <p className="mt-2  text-gray-600 text-center">Basics of earthquake safety for students.</p>
            </div>
          </div>

          <div className="px-4 pb-4 ">
            <a href={earthquakePDF} target="_blank" rel="noopener noreferrer" className="inline-block w-full text-center py-2 rounded-lg bg-blue-500 text-white hover:opacity-95">View PDF</a>
          </div>
        </article>

        {/* Video Card */}
        <article className="bg-gray-100 hover:scale-105 hover:shadow-2xl rounded-2xl shadow-md flex flex-col justify-between w-full max-w-sm h-[430px]">
          <div>
            <div className="relative">
              <img src={floodThumb} alt="Flood Preparedness Thumbnail" className="w-full h-48 object-cover rounded-t-2xl" />
              <div className="absolute inset-0 flex items-center justify-center">
                <iframe
                  title="Flood Preparedness"
                  src="https://www.youtube.com/embed/BLEPakj1YTY"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded-t-2xl"
                />
              </div>
            </div>

            <div className="p-4">
              <h3 className="text-xl font-medium text-center">Flood Preparedness</h3>
              <p className="mt-2 text-gray-600 text-center">Short video on flood preparedness.</p>
            </div>
          </div>
        </article>

        {/* PDF Card - Fire Safety */}
        <article className="bg-gray-100 hover:scale-105 hover:shadow-2xl rounded-2xl shadow-md flex flex-col justify-between w-full max-w-sm h-[430px]">
          <div>
            <img src={fireSafetyThumb} alt="Fire Safety Guide" className="w-full h-48 object-cover rounded-t-2xl" />

            <div className="p-4">
              <h3 className="text-xl font-medium text-center">Fire Safety Guide</h3>
              <p className="mt-2 text-gray-600 text-center">Important fire safety tips for students.</p>
            </div>
          </div>

          <div className="px-4 pb-4">
            <a href={fireSafetyPDF} target="_blank" rel="noopener noreferrer" className="inline-block w-full text-center py-2 rounded-lg bg-blue-500 text-white hover:opacity-95">View PDF</a>
          </div>
        </article>
      </div>
    </section>
  );
}
