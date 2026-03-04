'use client';

import { useState } from 'react';
import { Tractor, Sprout, Repeat2, FlaskConical, Droplets, Scissors, Bug, Wheat, Waves, ChevronsUpDown, ChevronUp, ChevronDown, Plus } from 'lucide-react';

const CATEGORY_STYLES = {
  land:       { icon: <Tractor className="w-4 h-4" />,       label: 'Land Prep',   color: 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300'  },
  sowing:     { icon: <Sprout className="w-4 h-4" />,        label: 'Sowing',      color: 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300'  },
  transplant: { icon: <Repeat2 className="w-4 h-4" />,       label: 'Transplant',  color: 'bg-teal-100 text-teal-700 border-teal-200 dark:bg-teal-900/30 dark:text-teal-300'      },
  fertilizer: { icon: <FlaskConical className="w-4 h-4" />,  label: 'Fertilizer',  color: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300'      },
  irrigation: { icon: <Droplets className="w-4 h-4" />,      label: 'Irrigation',  color: 'bg-sky-100 text-sky-700 border-sky-200 dark:bg-sky-900/30 dark:text-sky-300'          },
  weeding:    { icon: <Scissors className="w-4 h-4" />,      label: 'Weeding',     color: 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300' },
  pest:       { icon: <Bug className="w-4 h-4" />,           label: 'Pest Control',color: 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300'          },
  harvest:    { icon: <Wheat className="w-4 h-4" />,         label: 'Harvest',     color: 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300' },
  retting:    { icon: <Waves className="w-4 h-4" />,         label: 'Retting',     color: 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300' },
  thinning:   { icon: <Scissors className="w-4 h-4" />,      label: 'Thinning',    color: 'bg-lime-100 text-lime-700 border-lime-200 dark:bg-lime-900/30 dark:text-lime-300'      },
  earthing:   { icon: <Tractor className="w-4 h-4" />,       label: 'Earthing',    color: 'bg-stone-100 text-stone-700 border-stone-200 dark:bg-stone-900/30 dark:text-stone-300' },
};

const FERTILIZER_LABELS = {
  urea:         'Urea (ইউরিয়া)',
  tsp:          'TSP (টিএসপি)',
  mop:          'MOP (এমওপি)',
  gypsum:       'Gypsum (জিপসাম)',
  boron:        'Boron (বোরন)',
  zinc_sulfate: 'Zinc Sulfate (জিংক সালফেট)',
};

export default function PlanResult({ plan, onReset }) {
  const [activeTab, setActiveTab]     = useState('timeline');
  const [expandedWeek, setExpandedWeek] = useState(0); // first week open by default

  const tasksByWeek = plan.timeline.reduce((acc, task) => {
    if (!acc[task.week]) acc[task.week] = [];
    acc[task.week].push(task);
    return acc;
  }, {});

  const weeks = Object.keys(tasksByWeek).map(Number).sort((a, b) => a - b);

  const tabs = [
    { id: 'timeline', label: 'Timeline'        },
    { id: 'inputs',   label: 'Inputs'          },
    { id: 'schedule', label: 'Fert. Schedule'  },
    { id: 'advisory', label: 'Advisory'        },
  ];

  return (
    <div className="space-y-6">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">Your Farm Plan</h2>
          <p className="text-sm text-muted-foreground mt-0.5 flex items-center gap-1">
            {plan.location.district}
            {plan.location.upazila ? `, ${plan.location.upazila}` : ''}
          </p>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 text-sm text-primary font-medium
                     border border-border rounded-lg px-3 py-1.5
                     hover:bg-muted transition-colors"
        >
          <Plus className="w-4 h-4" /> New Plan
        </button>
      </div>

      {/* ── Summary card ───────────────────────────────────────────────────── */}
      <div className="bg-primary rounded-2xl p-5 text-primary-foreground">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-primary-foreground/70 text-xs">Crop</p>
            <p className="text-2xl font-bold">{plan.crop.nameBn}</p>
            <p className="text-primary-foreground/70 text-sm">{plan.crop.name}</p>
          </div>
          <div className="text-right">
            <p className="text-primary-foreground/70 text-xs">Season</p>
            <p className="font-semibold text-sm">{plan.crop.season}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-5 pt-4 border-t border-primary-foreground/20">
          <div>
            <p className="text-primary-foreground/70 text-xs">Land</p>
            <p className="font-bold">{plan.land.displaySize}</p>
            <p className="text-primary-foreground/70 text-xs">{plan.land.sizeInBigha} bigha</p>
          </div>
          <div>
            <p className="text-primary-foreground/70 text-xs">Planting</p>
            <p className="font-bold text-sm">
              {new Date(plan.dates.planting).toLocaleDateString('en-BD', { day: 'numeric', month: 'short', year: 'numeric' })}
            </p>
          </div>
          <div>
            <p className="text-primary-foreground/70 text-xs">Harvest</p>
            <p className="font-bold text-sm">
              {new Date(plan.dates.harvest).toLocaleDateString('en-BD', { day: 'numeric', month: 'short', year: 'numeric' })}
            </p>
          </div>
        </div>

        <div className="mt-4 bg-primary-foreground/10 rounded-xl p-3 flex items-center justify-between">
          <div>
            <p className="text-primary-foreground/70 text-xs">Estimated Yield</p>
            <p className="text-xl font-bold">{plan.yield.maund} মণ</p>
            <p className="text-primary-foreground/70 text-xs">{plan.yield.kg} kg · {plan.land.condition}</p>
          </div>
          <Wheat className="w-10 h-10 text-primary-foreground/40" />
        </div>
      </div>

      {/* ── Variety ────────────────────────────────────────────────────────── */}
      <div className="bg-muted border border-border rounded-lg p-3 text-sm text-foreground flex items-start gap-2">
        <Sprout className="w-4 h-4 text-primary mt-0.5 shrink-0" />
        <span><span className="font-medium">Recommended Variety:</span> {plan.crop.variety}</span>
      </div>

      {/* ── Tabs ───────────────────────────────────────────────────────────── */}
      <div className="flex border-b border-border gap-1 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              px-3 py-2 text-xs font-medium whitespace-nowrap rounded-t-lg transition-colors
              ${activeTab === tab.id
                ? 'border-b-2 border-primary text-primary bg-muted'
                : 'text-muted-foreground hover:text-foreground'}
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Tab: Timeline ──────────────────────────────────────────────────── */}
      {activeTab === 'timeline' && (
        <div className="space-y-3">
          <p className="text-xs text-muted-foreground">
            {plan.timeline.length} tasks over {plan.dates.duration} days. Tap a week to expand.
          </p>
          {weeks.map(week => {
            const tasks    = tasksByWeek[week];
            const isOpen   = expandedWeek === week;
            const firstDate = new Date(tasks[0].date).toLocaleDateString('en-BD', { day: 'numeric', month: 'short' });

            return (
              <div key={week} className="border border-border rounded-xl overflow-hidden bg-card">
                <button
                  className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted transition-colors"
                  onClick={() => setExpandedWeek(isOpen ? null : week)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-primary-foreground bg-primary
                                     rounded-full w-8 h-8 flex items-center justify-center shrink-0">
                      W{week}
                    </span>
                    <div className="text-left">
                      <p className="text-sm font-medium text-foreground">
                        Week {week}{week === 0 ? ' — Start' : ''}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {firstDate} · {tasks.length} task{tasks.length > 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {tasks.slice(0, 3).map((t, i) => {
                        const s = CATEGORY_STYLES[t.category];
                        return s ? (
                          <span key={i} className={`p-1 rounded-full border ${s.color}`}>
                            {s.icon}
                          </span>
                        ) : null;
                      })}
                    </div>
                    {isOpen
                      ? <ChevronUp className="w-4 h-4 text-muted-foreground" />
                      : <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    }
                  </div>
                </button>

                {isOpen && (
                  <div className="border-t border-border divide-y divide-border">
                    {tasks.map(task => {
                      const style = CATEGORY_STYLES[task.category] || {
                        icon: <ChevronsUpDown className="w-4 h-4" />,
                        label: task.category,
                        color: 'bg-muted text-muted-foreground border-border',
                      };
                      return (
                        <div key={task.id} className="px-4 py-3 flex items-start gap-3 bg-card">
                          <span className={`p-1.5 rounded-lg border mt-0.5 shrink-0 ${style.color}`}>
                            {style.icon}
                          </span>
                          <div className="flex-1">
                            <p className="text-sm text-foreground">{task.task}</p>
                            <div className="flex items-center gap-2 mt-1 flex-wrap">
                              <span className={`text-xs px-2 py-0.5 rounded-full border ${style.color}`}>
                                {style.label}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {new Date(task.date).toLocaleDateString('en-BD', { day: 'numeric', month: 'long', year: 'numeric' })}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ── Tab: Inputs ────────────────────────────────────────────────────── */}
      {activeTab === 'inputs' && (
        <div className="space-y-4">
          <div className="bg-muted border border-border rounded-xl p-4">
            <p className="text-sm font-semibold text-foreground mb-1 flex items-center gap-2">
              <Sprout className="w-4 h-4 text-primary" /> Seed Required
            </p>
            <p className="text-2xl font-bold text-primary">{plan.requirements.seed.amount} kg</p>
            <p className="text-xs text-muted-foreground mt-1">{plan.requirements.seed.note}</p>
          </div>

          <div className="bg-muted border border-border rounded-xl p-4">
            <p className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <FlaskConical className="w-4 h-4 text-primary" /> Total Fertilizer Required
            </p>
            <div className="space-y-2">
              {Object.entries(plan.requirements.fertilizer).map(([type, amount]) => (
                <div key={type} className="flex items-center justify-between">
                  <span className="text-sm text-foreground">{FERTILIZER_LABELS[type] || type}</span>
                  <span className="font-bold text-foreground">{amount} kg</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-muted border border-border rounded-xl p-4">
            <p className="text-sm font-semibold text-foreground mb-1 flex items-center gap-2">
              <Droplets className="w-4 h-4 text-primary" /> Irrigation
            </p>
            <p className="text-2xl font-bold text-primary">{plan.requirements.irrigation.count} times</p>
            <p className="text-xs text-muted-foreground mt-1">{plan.requirements.irrigation.note}</p>
          </div>

          <div className="bg-muted border border-border rounded-xl p-4">
            <p className="text-sm font-semibold text-foreground mb-1 flex items-center gap-2">
              <Bug className="w-4 h-4 text-destructive" /> Pesticide Budget
            </p>
            <p className="text-2xl font-bold text-destructive">৳ {plan.requirements.pesticideCost.amount}</p>
            <p className="text-xs text-muted-foreground mt-1">Approximate cost</p>
          </div>
        </div>
      )}

      {/* ── Tab: Fertilizer Schedule ───────────────────────────────────────── */}
      {activeTab === 'schedule' && (
        <div className="space-y-3">
          <p className="text-xs text-muted-foreground">Apply fertilizer on these dates for best results.</p>
          {plan.requirements.fertilizerSchedule.map((item, i) => (
            <div key={i} className="flex items-start gap-3 border border-border bg-muted rounded-xl p-3">
              <div className="bg-primary text-primary-foreground text-xs font-bold rounded-lg px-2 py-1 whitespace-nowrap">
                {new Date(item.date).toLocaleDateString('en-BD', { day: 'numeric', month: 'short' })}
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {FERTILIZER_LABELS[item.fertilizer] || item.fertilizer} — {item.amount} {item.unit}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Tab: Advisory ──────────────────────────────────────────────────── */}
      {activeTab === 'advisory' && (
        <div className="space-y-3">
          <p className="text-xs text-muted-foreground">
            Expert tips for growing {plan.crop.name} in Bangladesh.
          </p>
          {plan.advisory.map((tip, i) => (
            <div key={i} className="flex items-start gap-3 bg-muted border border-border rounded-xl p-3">
              <span className="text-highlight text-lg shrink-0">💡</span>
              <p className="text-sm text-foreground">{tip}</p>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}