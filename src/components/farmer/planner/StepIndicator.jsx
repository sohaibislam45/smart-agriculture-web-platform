'use client';

import { Check, Wheat, MapPin, Home } from 'lucide-react';

const STEP_ICONS = {
  1: <Wheat className="w-4 h-4" />,
  2: <MapPin className="w-4 h-4" />,
  3: <Home  className="w-4 h-4" />,
};

export default function StepIndicator({ currentStep, steps }) {
  return (
    <div className="w-full mb-8">

      {/* Step circles + connecting lines */}
      <div className="flex items-center justify-center">
        {steps.map((label, index) => {
          const stepNum   = index + 1;
          const isDone    = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;

          return (
            <div key={stepNum} className="flex items-center">

              {/* Circle + label */}
              <div className="flex flex-col items-center">
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center
                    transition-all duration-300
                    ${isDone    ? 'bg-secondary text-secondary-foreground'                          : ''}
                    ${isCurrent ? 'bg-primary text-primary-foreground ring-4 ring-ring'             : ''}
                    ${!isDone && !isCurrent ? 'bg-muted text-muted-foreground border border-border' : ''}
                  `}
                >
                  {isDone ? <Check className="w-4 h-4" /> : STEP_ICONS[stepNum]}
                </div>

                {/* Label */}
                <span
                  className={`
                    mt-2 text-xs font-medium text-center w-20
                    ${isCurrent ? 'text-primary'          : ''}
                    ${isDone    ? 'text-secondary'         : ''}
                    ${!isDone && !isCurrent ? 'text-muted-foreground' : ''}
                  `}
                >
                  {label}
                </span>
              </div>

              {/* Connecting line */}
              {index < steps.length - 1 && (
                <div
                  className={`
                    h-1 w-16 mx-2 mb-5 rounded transition-all duration-300
                    ${stepNum < currentStep ? 'bg-secondary' : 'bg-border'}
                  `}
                />
              )}

            </div>
          );
        })}
      </div>

      {/* Step counter */}
      <p className="text-center text-sm text-muted-foreground mt-3">
        Step <span className="font-semibold text-primary">{currentStep}</span> of{' '}
        <span className="font-semibold text-foreground">{steps.length}</span>
      </p>

    </div>
  );
}