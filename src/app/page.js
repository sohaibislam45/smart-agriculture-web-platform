import AboutUs from "@/component/Home/AboutUs";
import OurService from "@/component/Home/OurService";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* About Us */}
      <AboutUs></AboutUs>

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

      <OurService></OurService>

      {/* How It Works */}

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-14">
          <p className="mb-4 text-4xl font-bold text-green-700 text-center">
            How It Works
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            The Smart Farming Process
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto mt-4">
            From data collection to actionable insights, see how our smart
            agriculture solutions transform the way farms operate.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* LEFT CONTENT */}
          <div>
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
