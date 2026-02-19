import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* About Us */}
      <section className="py-16 mt-16 bg-green-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className=" mb-4 text-4xl font-bold text-green-700 text-center">
                About Us
              </h2>
              <p className="text-gray-600 mb-4">
                Farming Made Smarter, Greener, and More Profitable.
              </p>
              <p className="text-gray-600">
                At Smart Agriculture, we blend innovation with sustainability to
                help farmers achieve more with less. From AI-powered crop
                monitoring to smart irrigation.
              </p>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className=" bg-gray-200 rounded-lg flex items-center justify-center">
                <img src="/about2.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission & Vision */}

      <section className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-green-700 text-center mb-6">
          Our Mission & Vision
        </h2>
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Image */}
          <div className="rounded-3xl overflow-hidden">
            <img
              src="/about1.png"
              alt="Smart Farming"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Mission & Vision */}
          <div className="space-y-6">
            <div className="bg-green-900 text-white p-6 md:p-8 rounded-2xl">
              <h3 className="text-xl md:text-2xl font-bold mb-3">
                Our Mission
              </h3>
              <p className="text-sm md:text-base leading-relaxed">
                At Farmory, our mission is to empower farmers with smart,
                sustainable technologies that increase yields, reduce resource
                waste, and improve efficiency.
              </p>
            </div>

            <div className="bg-green-900 text-white p-6 md:p-8 rounded-2xl">
              <h3 className="text-xl md:text-2xl font-bold mb-3">Our Vision</h3>
              <p className="text-sm md:text-base leading-relaxed">
                To build a future where farming is data-driven, connected, and
                environmentally responsible.
              </p>
            </div>
          </div>
        </div>

       
      </section>

      
      
    </div>
  );
}
