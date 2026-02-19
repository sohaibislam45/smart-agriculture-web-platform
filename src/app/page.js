import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* About Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold mb-4 text-gray-800">
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

      {/*  */}

     

      {/*  */}
    </div>
  );
}
