'use client';

import { useState } from 'react';
import { Wheat, Sprout, Sun } from 'lucide-react';
import { getAllCrops, getCropsBySeason, SEASONS } from '@/lib/data/crops';

const SEASON_ICONS = {
  rabi:     <Sun className="w-4 h-4" />,
  kharif_1: <Sprout className="w-4 h-4" />,
  kharif_2: <Wheat className="w-4 h-4" />,
};

export default function StepOne({ data, onChange, onNext }) {
  const [selectedSeason, setSelectedSeason] = useState(data.season || '');
  const [errors, setErrors]                 = useState({});

  const filteredCrops = selectedSeason ? getCropsBySeason(selectedSeason) : getAllCrops();

  const validate = () => {
    const e = {};
    if (!data.cropId)       e.cropId       = 'Please select a crop';
    if (!data.plantingDate) e.plantingDate = 'Please select a planting date';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => { if (validate()) onNext(); };

  const selectedCrop = filteredCrops.find(c => c.id === data.cropId);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground">Crop & Planting Date</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Select the crop you want to grow and when you plan to start.
        </p>
      </div>

      {/* ── Season selector ───────────────────────────────────────────────── */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Season <span className="text-muted-foreground font-normal">(optional — filters crops)</span>
        </label>
        <div className="grid grid-cols-3 gap-3">
          {Object.values(SEASONS).map(season => {
            const isSelected = selectedSeason === season.id;
            return (
              <button
                key={season.id}
                type="button"
                onClick={() => {
                  const newSeason = isSelected ? '' : season.id;
                  setSelectedSeason(newSeason);
                  onChange({ ...data, season: newSeason, cropId: '' });
                }}
                className={`
                  p-3 rounded-lg border-2 text-sm font-medium transition-all
                  ${isSelected
                    ? 'border-primary bg-muted text-primary'
                    : 'border-border bg-card text-card-foreground hover:border-ring'}
                `}
              >
                <div className={`flex justify-center mb-1 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`}>
                  {SEASON_ICONS[season.id]}
                </div>
                <div className="font-semibold text-xs">{season.label.split(' ')[0]}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{season.months}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Crop selector ─────────────────────────────────────────────────── */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Crop <span className="text-destructive">*</span>
        </label>
        <div className="grid grid-cols-2 gap-3">
          {filteredCrops.map(crop => {
            const isSelected = data.cropId === crop.id;
            return (
              <button
                key={crop.id}
                type="button"
                onClick={() => onChange({ ...data, cropId: crop.id })}
                className={`
                  p-3 rounded-lg border-2 text-left transition-all
                  ${isSelected
                    ? 'border-primary bg-muted'
                    : 'border-border bg-card hover:border-ring'}
                `}
              >
                <div className={`font-semibold text-sm ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                  {crop.nameBn}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">{crop.name}</div>
                <div className={`text-xs mt-1 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`}>
                  {crop.season.label.split(' ')[0]}
                </div>
              </button>
            );
          })}
        </div>
        {errors.cropId && <p className="text-destructive text-xs mt-1">{errors.cropId}</p>}
      </div>

      {/* ── Selected crop preview ─────────────────────────────────────────── */}
      {selectedCrop && (
        <div className="bg-muted border border-border rounded-lg p-4 text-sm space-y-1">
          <p className="font-semibold text-foreground">{selectedCrop.name} — {selectedCrop.nameBn}</p>
          <p className="text-muted-foreground">🌱 Variety: {selectedCrop.variety}</p>
          <p className="text-muted-foreground">📅 Duration: ~{selectedCrop.duration} days to harvest</p>
          <p className="text-muted-foreground">🗓 Season: {selectedCrop.season.label}</p>
        </div>
      )}

      {/* ── Planting date ─────────────────────────────────────────────────── */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Planting Date <span className="text-destructive">*</span>
        </label>
        <input
          type="date"
          value={data.plantingDate}
          onChange={e => onChange({ ...data, plantingDate: e.target.value })}
          className="w-full border border-input bg-card text-card-foreground
                     rounded-lg px-4 py-2.5 text-sm
                     focus:outline-none focus:ring-2 focus:ring-ring"
        />
        {selectedCrop && data.plantingDate && (
          <p className="text-xs text-primary mt-1">
            🌾 Estimated harvest:{' '}
            {new Date(
              new Date(data.plantingDate).getTime() +
              selectedCrop.duration * 24 * 60 * 60 * 1000
            ).toLocaleDateString('en-BD', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        )}
        {errors.plantingDate && <p className="text-destructive text-xs mt-1">{errors.plantingDate}</p>}
      </div>

      {/* ── Next ──────────────────────────────────────────────────────────── */}
      <button
        type="button"
        onClick={handleNext}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground
                   font-semibold py-3 rounded-lg transition-colors"
      >
        Next → Location
      </button>
    </div>
  );
}