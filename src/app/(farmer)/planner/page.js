'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import PrivateRoute    from '@/components/auth/PrivateRoute';
import StepIndicator   from '@/components/farmer/planner/StepIndicator';
import StepOne         from '@/components/farmer/planner/StepOne';
import StepTwo         from '@/components/farmer/planner/StepTwo';
import StepThree       from '@/components/farmer/planner/StepThree';
import PlanResult      from '@/components/farmer/planner/PlanResult';
import { useAuth }     from '@/hooks/useAuth';

// ─── Initial form state ───────────────────────────────────────────────────────
const INITIAL_FORM = {
  // Step 1
  season:       '',
  cropId:       '',
  plantingDate: '',
  // Step 2
  division:     '',
  district:     '',
  upazila:      '',
  // Step 3
  landSize:     '',
  landUnit:     'bigha',
  landCondition:'',
  soilType:     '',
};

const STEPS = ['Crop & Date', 'Location', 'Land Details'];

export default function PlannerPage() {
  const { user }                  = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm]           = useState(INITIAL_FORM);
  const [plan, setPlan]           = useState(null);
  const [loading, setLoading]     = useState(false);

  // ── Form change handler ───────────────────────────────────────────────────
  // Each step calls onChange with its updated slice of the form.
  // We merge it into the full form so all steps share one state object.
  const handleChange = (updatedFields) => {
    setForm(prev => ({ ...prev, ...updatedFields }));
  };

  // ── Submit: call the API ──────────────────────────────────────────────────
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      const res   = await fetch('/api/planner/generate', {
        method:  'POST',
        headers: {
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          cropId:        form.cropId,
          landSize:      parseFloat(form.landSize),
          landUnit:      form.landUnit,
          landCondition: form.landCondition,
          soilType:      form.soilType,
          plantingDate:  form.plantingDate,
          district:      form.district,
          upazila:       form.upazila || '',
        }),
      });

      const data = await res.json();

      if (data.success) {
        setPlan(data.plan);
        toast.success('Your farm plan has been generated!');
      } else {
        toast.error(data.error || 'Failed to generate plan. Please try again.');
      }
    } catch {
      toast.error('Something went wrong. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  // ── Reset: start over ─────────────────────────────────────────────────────
  const handleReset = () => {
    setForm(INITIAL_FORM);
    setPlan(null);
    setCurrentStep(1);
  };

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-background py-10 px-4">
        <div className="max-w-xl mx-auto">

          {/* ── Page header ──────────────────────────────────────────────── */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground">🌾 Smart Farm Planner</h1>
            <p className="text-muted-foreground mt-2 text-sm">
              {user?.name ? `Welcome, ${user.name}.` : ''}{' '}
              Enter your details to get a complete seasonal farm plan.
            </p>
          </div>

          {/* ── Card ─────────────────────────────────────────────────────── */}
          <div className="bg-card border border-border rounded-2xl shadow-sm p-6">

            {/* Show step indicator + form only when no plan yet */}
            {!plan ? (
              <>
                <StepIndicator currentStep={currentStep} steps={STEPS} />

                {currentStep === 1 && (
                  <StepOne
                    data={form}
                    onChange={handleChange}
                    onNext={() => setCurrentStep(2)}
                  />
                )}

                {currentStep === 2 && (
                  <StepTwo
                    data={form}
                    onChange={handleChange}
                    onNext={() => setCurrentStep(3)}
                    onBack={() => setCurrentStep(1)}
                  />
                )}

                {currentStep === 3 && (
                  <StepThree
                    data={form}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    onBack={() => setCurrentStep(2)}
                    loading={loading}
                  />
                )}
              </>
            ) : (
              <PlanResult plan={plan} onReset={handleReset} />
            )}

          </div>

          {/* ── Footer note ──────────────────────────────────────────────── */}
          {!plan && (
            <p className="text-center text-xs text-muted-foreground mt-6">
              All recommendations are based on Bangladesh DAE agricultural guidelines.
            </p>
          )}

        </div>
      </div>
    </PrivateRoute>
  );
}