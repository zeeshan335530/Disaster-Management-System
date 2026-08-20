// src/components/FeatureCard.jsx
export default function FeatureCard({ title, icon, para }) {
  return (
    <div className="bg-gray-100 rounded-xl shadow-md p-6 flex flex-col items-center text-center transition hover:scale-105 hover:shadow-2xl"
    
    >
      <span className="text-4xl mb-4">{icon}</span>
      <h3 className="text-black text-lg font-semibold">{title}</h3>
      <p className="text-black mt-5  text-sm font-bold font-serif">{para}</p>
    </div>
  );
}
