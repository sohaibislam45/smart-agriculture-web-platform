'use client';

import { useState } from 'react';
import { Sprout, Leaf, Mountain, Droplets, Waves, Wind, Layers } from 'lucide-react';
import { UNITS, UNIT_LABELS, toBigha } from '@/lib/data/units';
import { LAND_CONDITIONS, SOIL_TYPES } from '@/lib/data/crops';

const CONDITION_META = {
  fertile: {
    icon: <Sprout className="w-5 h-5" />,
    description: 'Rich soil, good water retention, high organic matter. Expect above-average yield.',
  },
  average: {
    icon: <Leaf className="w-5 h-5" />,
    description: 'Normal soil conditions. Standard yield expected.',
  },
  poor: {
    icon: <Mountain className="w-5 h-5" />,
    description: 'Low fertility, sandy or degraded soil. Requires more fertilizer, lower yield expected.',
  },
};

const SOIL_META = {
  loamy:  { icon: <Layers className="w-5 h-5" />,   description: 'Best for most crops — retains moisture and nutrients well.' },
  clay:   { icon: <Droplets className="w-5 h-5" />,  description: 'Heavy soil, retains water — good for rice, needs drainage management.' },
  sandy:  { icon: <Wind className="w-5 h-5" />,      description: 'Drains quickly — needs more irrigation and organic matter.' },
  silt:   { icon: <Waves className="w-5 h-5" />,     description: 'Fine particles, fertile and moisture-retentive — excellent for most crops.' },
};

export default function StepThree({ data, onChange, onSubmit, onBack, loading }) {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!data.landSize || isNaN(data.landSize) || parseFloat(data.landSize) <= 0)
      e.landSize = 'Please enter a valid land size greater than 0';
    if (!data.landUnit)      e.landUnit      = 'Please select a unit';
    if (!data.landCondition) e.landCondition = 'Please select land condition';
    if (!data.soilType)      e.soilType      = 'Please select soil type';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => { if (validate()) onSubmit(); };

  const bighaEquivalent = data.landSize && data.landUnit && !isNaN(data.landSize)
    ? toBigha(parseFloat(data.landSize), data.landUnit).toFixed(2)
    : null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground">Land Details</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Tell us about your land so we can calculate the right amounts for you.
        </p>
      </div>

      {/* ── Land size + unit ─────────────────────────────────────────────── */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Land Size <span className="text-destructive">*</span>
        </label>
        <div className="flex gap-3">
          <input
            type="number"
            min="0"
            step="0.01"
            placeholder="e.g. 2.5"
            value={data.landSize}
            onChange={e => onChange({ ...data, landSize: e.target.value })}
            className="flex-1 border border-input bg-card text-card-foreground
                       rounded-lg px-4 py-2.5 text-sm
                       focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <select
            value={data.landUnit}
            onChange={e => onChange({ ...data, landUnit: e.target.value })}
            className="w-36 border border-input bg-card text-card-foreground
                       rounded-lg px-3 py-2.5 text-sm
                       focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Unit</option>
            {Object.values(UNITS).map(unit => (
              <option key={unit} value={unit}>{UNIT_LABELS[unit]}</option>
            ))}
          </select>
        </div>
        {bighaEquivalent && data.landUnit !== UNITS.BIGHA && (
          <p className="text-xs text-primary mt-1">≈ {bighaEquivalent} বিঘা (Bigha)</p>
        )}
        {errors.landSize && <p className="text-destructive text-xs mt-1">{errors.landSize}</p>}
        {errors.landUnit && <p className="text-destructive text-xs mt-1">{errors.landUnit}</p>}
      </div>

      {/* ── Land condition ────────────────────────────────────────────────── */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Land Condition <span className="text-destructive">*</span>
        </label>
        <div className="grid grid-cols-3 gap-3">
          {Object.values(LAND_CONDITIONS).map(condition => {
            const meta      = CONDITION_META[condition.id];
            const isSelected = data.landCondition === condition.id;
            return (
              <button
                key={condition.id}
                type="button"
                onClick={() => onChange({ ...data, landCondition: condition.id })}
                className={`
                  p-3 rounded-lg border-2 text-left transition-all
                  ${isSelected
                    ? 'border-primary bg-muted text-primary'
                    : 'border-border bg-card text-card-foreground hover:border-ring'}
                `}
              >
                <div className={`${isSelected ? 'text-primary' : 'text-muted-foreground'}`}>
                  {meta.icon}
                </div>
                <div className={`text-sm font-semibold mt-1 ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                  {condition.label.split(' ')[0]}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {condition.label.match(/\(([^)]+)\)/)?.[1] || ''}
                </div>
              </button>
            );
          })}
        </div>
        {data.landCondition && (
          <p className="text-xs text-muted-foreground mt-2 bg-muted rounded-lg p-2">
            {CONDITION_META[data.landCondition].description}
          </p>
        )}
        {errors.landCondition && <p className="text-destructive text-xs mt-1">{errors.landCondition}</p>}
      </div>

      {/* ── Soil type ─────────────────────────────────────────────────────── */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Soil Type <span className="text-destructive">*</span>
        </label>
        <div className="grid grid-cols-2 gap-3">
          {Object.values(SOIL_TYPES).map(soil => {
            const meta       = SOIL_META[soil.id];
            const isSelected = data.soilType === soil.id;
            return (
              <button
                key={soil.id}
                type="button"
                onClick={() => onChange({ ...data, soilType: soil.id })}
                className={`
                  p-3 rounded-lg border-2 text-left transition-all
                  ${isSelected
                    ? 'border-primary bg-muted text-primary'
                    : 'border-border bg-card text-card-foreground hover:border-ring'}
                `}
              >
                <div className={`${isSelected ? 'text-primary' : 'text-muted-foreground'}`}>
                  {meta.icon}
                </div>
                <div className={`text-sm font-semibold mt-1 ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                  {soil.label.split(' ')[0]}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {soil.label.match(/\(([^)]+)\)/)?.[1] || ''}
                </div>
              </button>
            );
          })}
        </div>
        {data.soilType && (
          <p className="text-xs text-muted-foreground mt-2 bg-muted rounded-lg p-2">
            {SOIL_META[data.soilType].description}
          </p>
        )}
        {errors.soilType && <p className="text-destructive text-xs mt-1">{errors.soilType}</p>}
      </div>

      {/* ── Navigation ───────────────────────────────────────────────────── */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          disabled={loading}
          className="flex-1 border-2 border-border text-foreground font-semibold
                     py-3 rounded-lg hover:bg-muted transition-colors
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground
                     font-semibold py-3 rounded-lg transition-colors
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Generating...' : 'Generate Plan 🌾'}
        </button>
      </div>
    </div>
  );
}