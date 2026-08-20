export default function About() {
  return (
    <section id="about"
      className="relative bg-cover bg-center "
      style={{ minHeight: "800px" }}
    >
      <div className="bg-gray-100 bg-opacity-60 w-full h-full px-8 py-10 text-center relative">
        <h1 className="text-blue-500 font-bold text-center text-4xl font-serif ">About</h1>
        <hr className="w-10 h-1 bg-blue-500 mx-auto mb-10" />

        {/* Heading and Intro Paragraph */}
        <h2 className="text-2xl text-black md:text-3xl font-bold mb-4">
          Real-time Monitoring & Response for Disaster Management
        </h2>
        <p className="text-lg md:text-md mb-12 max-w-4xl mx-auto text-black">
          Disasters, whether natural or man-made, often strike without warning, causing loss of lives, property, and resources. 
          Traditional disaster management approaches are usually reactive, leading to delayed responses and ineffective coordination. 
          To overcome these challenges, we have developed a Real-time Monitoring & Response Disaster Management System that leverages 
          modern technologies for faster, smarter, and more effective disaster handling.
        </p>

        {/* Parallel Boxes with Hover Zoom */}
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-8">

          {/* Box 1 */}
          <div className="flex-1 w-full md:w-[450px] h-[400px] bg-gray-500 bg-opacity-5 backdrop-blur-lg rounded-xl p-6 shadow-lg 
                          transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            <h3 className="text-xl font-bold mb-8 text-blue-500">🔹 Key Objectives</h3>
            <ul className="text-md space-y-1 text-left text-black">
              <li className="text-black">Early Detection: Monitor critical parameters using sensors, IoT, and satellite data.</li>
              <li className="text-black">Real-time Alerts: Instant notifications to authorities and public.</li>
              <li className="text-black">Rapid Response Coordination: Connect stakeholders on a single platform.</li>
              <li className="text-black">Data-driven Decisions: Predict disaster impacts and evacuation plans.</li>
              <li className="text-black">Community Safety: Timely evacuation guidance and post-disaster support.</li>
            </ul>
          </div>

          {/* Box 2 */}
          <div className="flex-1 w-full md:w-[450px] h-[400px] bg-gray-500 bg-opacity-5 backdrop-blur-lg rounded-xl p-6 shadow-lg 
                          transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            <h3 className="text-xl font-bold mb-8 text-blue-500">🔹 Features</h3>
            <ul className="text-md space-y-1 text-left ">
              <li className="text-black">📡 IoT-enabled monitoring of disaster-prone areas.</li>
              <li className="text-black">🚨 AI-powered alert system for early warnings.</li>
              <li className="text-black">📊 Interactive dashboard for live updates.</li>
              <li className="text-black">📱 Mobile-friendly app for citizens.</li>
              <li className="text-black">🤝 Collaboration tools for authorities and NGOs.</li>
            </ul>
          </div>

          {/* Box 3 */}
          <div className="flex-1 w-full md:w-[450px] h-[400px] bg-gray-500 bg-opacity-5 backdrop-blur-lg rounded-xl p-6 shadow-lg 
                          transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            <h3 className="text-xl font-bold mb-8 text-blue-500">🔹 Why It Matters</h3>
            <p className="text-md text-left text-black">
              Transforms disaster management from reactive to proactive. Reduces delays, saves lives, and minimizes economic losses during emergencies.
            </p>
          </div>

        </div>
      </div>

    </section>
  );
}
