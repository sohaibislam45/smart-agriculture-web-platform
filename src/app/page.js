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
     
      {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center mt-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-green-900">
              1,000+
            </h2>
            <p className="mt-2 text-gray-600">Smart Farms Optimized</p>
          </div>

          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-green-900">
              30%
            </h2>
            <p className="mt-2 text-gray-600">Water Saved per Farm</p>
          </div>

          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-green-900">
              40%
            </h2>
            <p className="mt-2 text-gray-600">Increase in Crop Yields</p>
          </div>
        </div>

       
      </section>

       {/*Our Services  */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4">
          {/* Heading */}
          <div className="text-center mb-14">
            <p className="mb-4 text-4xl font-bold text-green-700 text-center">
              Our Services
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Innovative Services for Smarter Farming
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mt-4">
              We integrate AI, IoT, and smart technologies to optimize resources
              and improve crop productivity.
            </p>
          </div>

          {/* Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl overflow-hidden border hover:shadow-lg transition">
              <img
                src="/img1.png"
                alt="AI Crop Monitoring"
                className="h-56 w-full object-cover"
              />
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold mb-3">AI Crop Monitoring</h3>
                <p className="text-gray-600 text-sm">
                  Analyze crop health, detect diseases early, and optimize
                  harvesting using AI.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl overflow-hidden border hover:shadow-lg transition">
              <img
                src="/img2.png"
                alt="Smart Irrigation"
                className="h-56 w-full object-cover"
              />
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold mb-3">
                  Smart Irrigation Systems
                </h3>
                <p className="text-gray-600 text-sm">
                  Reduce water waste and improve crop growth through intelligent
                  irrigation control.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl overflow-hidden border hover:shadow-lg transition">
              <img
                src="/img3.png"
                alt="Drone Farming"
                className="h-56 w-full object-cover"
              />
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold mb-3">
                  Drone & Satellite Farming
                </h3>
                <p className="text-gray-600 text-sm">
                  Monitor large farms efficiently using drones and
                  satellite-based data insights.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}

      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* LEFT CONTENT */}
          <div>
            <p className="mb-4 text-4xl font-bold text-green-700 text-center">
              How It Works
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              The Smart Farming Process
            </h2>

            <p className="text-gray-600 mb-10 max-w-xl">
              From data collection to actionable insights, see how our smart
              agriculture solutions transform the way farms operate.
            </p>

            {/* Step 1 */}
            <div className="bg-green-900 text-white p-6 rounded-2xl flex gap-4 mb-6">
              <span className="bg-yellow-400 text-green-900 font-bold px-4 py-2 rounded-full h-fit">
                01
              </span>
              <div>
                <h3 className="text-lg md:text-xl font-bold mb-2">
                  Collect Real-Time Farm Data
                </h3>
                <p className="text-sm md:text-base text-green-100">
                  Sensors and smart devices collect real-time data on soil,
                  weather, crops, and farm conditions.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-green-900 text-white p-6 rounded-2xl flex gap-4 mb-6">
              <span className="bg-yellow-400 text-green-900 font-bold px-4 py-2 rounded-full h-fit">
                02
              </span>
              <div>
                <h3 className="text-lg md:text-xl font-bold mb-2">
                  AI-Driven Recommendations
                </h3>
                <p className="text-sm md:text-base text-green-100">
                  Artificial intelligence analyzes collected data and provides
                  smart crop and resource recommendations.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-green-900 text-white p-6 rounded-2xl flex gap-4 mb-6">
              <span className="bg-yellow-400 text-green-900 font-bold px-4 py-2 rounded-full h-fit">
                03
              </span>
              <div>
                <h3 className="text-lg md:text-xl font-bold mb-2">
                  Smart Farm Automation
                </h3>
                <p className="text-sm md:text-base text-green-100">
                  Automated systems manage irrigation, fertilization, and crop
                  health monitoring efficiently.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-green-900 text-white p-6 rounded-2xl flex gap-4">
              <span className="bg-yellow-400 text-green-900 font-bold px-4 py-2 rounded-full h-fit">
                04
              </span>
              <div>
                <h3 className="text-lg md:text-xl font-bold mb-2">
                  Grow More with Less Effort
                </h3>
                <p className="text-sm md:text-base text-green-100">
                  Farmers achieve higher yields, lower costs, and sustainable
                  farming with minimal effort.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative">
            <img
              src="/work.png"
              alt="Smart Farming Process"
              className="rounded-3xl w-full object-cover"
            />

            {/* Small Video Card */}
            <div className="absolute bottom-6 left-6 bg-white rounded-2xl p-4 flex items-center gap-4 shadow-lg">
              <img
                src="/work2.png"
                alt="Video"
                className="w-40 h-20 rounded-xl object-cover"
              />
              <button className="bg-yellow-400 w-12 h-12 rounded-full flex items-center justify-center">
                ▶
              </button>
            </div>
          </div>
        </div>
      </section>

      {/*  */}
     

      
    </div>
  );
}
