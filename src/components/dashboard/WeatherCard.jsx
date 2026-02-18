import React from 'react';
import SectionCard from '../ui/SectionCard';

const WeatherCard = () => {
    return (
           <SectionCard title="Weather">
      <p className="text-sm text-gray-500 mb-2">
         Farmvilla
      </p>

      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-3xl font-bold">29°C</p>
          <p className="text-sm text-gray-500">Sunny</p>
        </div>
        <div className="text-4xl">☀️</div>
      </div>

      <div className="grid grid-cols-4 gap-2 text-center text-sm">
        <div className="bg-gray-100 rounded-lg p-2">
          🌤 <br /> 28°
        </div>
        <div className="bg-gray-100 rounded-lg p-2">
          ☀️ <br /> 30°
        </div>
        <div className="bg-gray-100 rounded-lg p-2">
          🌧 <br /> 26°
        </div>
        <div className="bg-gray-100 rounded-lg p-2">
          ☁️ <br /> 27°
        </div>
      </div>
    </SectionCard>
    );
};

export default WeatherCard;