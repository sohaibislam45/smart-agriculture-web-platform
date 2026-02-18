import React from 'react';

const page = () => {
    return (
        <div className="p-4 md:p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Title */}
      <h1 className="text-2xl font-semibold text-gray-800">
        Dashboard
      </h1>

      {/* SUMMARY CARDS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div  className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition"  />
        <div  className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition"/>
        <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition"/>
        <div  className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition"  />
      </section>

      {/* MAIN GRID */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm"/>
        <div className="bg-white p-4 rounded-xl shadow-sm"/>
      </section>

      {/* SECONDARY GRID */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm"/>
        <div className="bg-white p-4 rounded-xl shadow-sm"/>
      </section>
    </div>
    );
};

export default page;