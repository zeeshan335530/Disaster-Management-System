import React from "react";
import FeatureCard from "./FeatureCard";

export default function Feature() {
  return (
    <section id="feature" className="max-w-6xl mx-auto px-4 py-12">
      {/* Heading */}
      <h1 className="text-blue-500 font-bold text-center text-5xl mt-6 font-serif">
        Features
      </h1>
      <hr className="w-10 h-1 bg-blue-500 mx-auto mt-2" />

      {/* Feature cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-2 py-10">
        {/* Feature 1 */}
        <FeatureCard
          title="Live Disaster Alerts"
          para="Displays real-time updates on ongoing disasters such as floods, earthquakes, or fires. 
          Uses live data from APIs or your own backend to show alerts on a map and notify users instantly.
          Why it’s essential: It represents the core 'real-time monitoring' functionality that keeps users informed and safe."
        />

        {/* Feature 2 */}
        <FeatureCard
          title="Incident Reporting System"
          para="Allows users or field responders to quickly report a new incident by filling out a short form with details like location, type of disaster, and severity. 
          The report appears on the dashboard for admin review. 
          Why it’s essential: It covers the response aspect of your project — letting users contribute and enabling swift action."
        />

        {/* Feature 3 */}
        <FeatureCard
          title="Safety Tips & Preparedness"
          para="Educational section with do’s and don’ts for each disaster type. 
          Includes links to government or NGO resources, helping raise awareness and readiness before emergencies strike."
        />
      </div>
    </section>
  );
}
