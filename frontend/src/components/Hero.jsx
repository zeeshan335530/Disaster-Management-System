import heroImage from "../assets/hero1.png";

export default function Hero() {
  return (
    <section
      className="relative bg-cover bg-center text-white"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
    >
      {/* Overlay covers whole section */}
      <div className="absolute inset-0 bg-black bg-opacity-60" />

      {/* Content wrapper */}
      <div
        className="relative z-10 flex items-center justify-center text-center px-6 md:px-12"
        style={{
          minHeight: "100vh",
          transform: "translateY(-120px)", // 🔹 moves content slightly upward
        }}
      >
        <div className="max-w-3xl pt-16 md:pt-20">
          <h1 className="text-4xl md:text-5xl text-blue-400 font-bold mb-4 mt-0">
            Disaster Management System
          </h1>

          <h2 className="text-2xl md:text-3xl text-gray-300 font-semibold mb-6 mt-0">
            Real-time Monitoring & Response
          </h2>

          <p className="text-lg md:text-base text-gray-200 leading-relaxed mt-0">
            Empowering schools and colleges with interactive disaster
          <p className="text-lg md:text-base text-gray-200 leading-relaxed mt-0">
           management learning — prepare, act and stay safe
           <p className="text-lg md:text-base text-gray-200 leading-relaxed mt-0">
            through gamified experiences.
           </p>
          </p>
          </p>
        </div>
      </div>
    </section>
  );
}
