import React from "react";

const Contact = () => {
  const contacts = [
    { icon: "🚓", title: "Police", number: "100" },
    { icon: "🚑", title: "Ambulance", number: "108" },
    { icon: "🔥", title: "Fire", number: "101" },
    { icon: "🌀", title: "NDMA", number: "1078" },
    { icon: "🏥", title: "Hospital", number: "112" },
    { icon: "📞", title: "Local Helpline", number: "8595902526" },
  ];

  return (
    <section id="contact" className="py-20 px-6 bg-gray-100 text-black">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl text-blue-500 font-bold mb-2">
          📩 Emergency Contact Us
        </h2>
        <hr className="w-10 h-1 bg-blue-500 mx-auto mt-2 mb-6" />
        <p className="text-lg mb-12 text-black">
          ⚠️ "Stay calm, stay alert — your quick action can save lives."
        </p>

        {/* Emergency Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {contacts.map((contact, index) => (
            <div
              key={index}
              className="bg-gray-400 text-black shadow-md rounded-xl py-4 px-6 flex items-center justify-center gap-2 text-lg font-semibold hover:shadow-lg transition-all duration-300"
            >
              <span>{contact.icon}</span>
              <span className="text-black">
                {contact.title} – {contact.number}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
