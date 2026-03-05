"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Wind,
  Droplets,
  Thermometer,
  Gauge,
  MapPin,
  Search,
  Navigation,
  CloudSun,
} from "lucide-react";
import Header from "@/components/shared/Header";

const MapContainer = dynamic(
  () => import("react-leaflet").then((m) => m.MapContainer),
  { ssr: false },
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((m) => m.TileLayer),
  { ssr: false },
);
const Marker = dynamic(() => import("react-leaflet").then((m) => m.Marker), {
  ssr: false,
});
const Popup = dynamic(() => import("react-leaflet").then((m) => m.Popup), {
  ssr: false,
});

// ─── Floating leaves (matches PlannerPage) ────────────────────────────────────
function FloatingLeaves() {
  const leaves = ["🌿", "🌾", "🍃", "🌱"];
  return (
    <>
      {leaves.map((leaf, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl pointer-events-none select-none"
          style={{
            top: `${15 + i * 18}%`,
            left: i % 2 === 0 ? `${4 + i * 2}%` : undefined,
            right: i % 2 !== 0 ? `${4 + i * 2}%` : undefined,
          }}
          animate={{
            y: [0, -16, 0],
            rotate: [0, 8, -8, 0],
            opacity: [0.08, 0.16, 0.08],
          }}
          transition={{
            duration: 5 + i * 1.5,
            repeat: Infinity,
            delay: i * 0.7,
            ease: "easeInOut",
          }}
        >
          {leaf}
        </motion.div>
      ))}
    </>
  );
}

// ─── Page Banner (matches PlannerPage structure) ──────────────────────────────
function PageBanner() {
  return (
    <div className="relative h-56 sm:h-64 w-full">
      <Image
        src="/images/planner-bg.jpg"
        alt="Smart Weather Assistant"
        fill
        className="object-cover object-center"
        sizes="100vw"
        quality={90}
        priority
      />
      <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/40 to-black/75" />
      <div className="absolute inset-0 bg-primary/25 mix-blend-multiply" />

      <FloatingLeaves />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
            bg-yellow-400/20 border border-yellow-400/40
            text-yellow-300 text-xs font-bold tracking-widest uppercase mb-4"
        >
          <CloudSun size={13} />
          Smart Weather Assistant
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl sm:text-4xl font-extrabold text-white leading-tight tracking-tight mb-3"
        >
          Know Your Fields&apos;{" "}
          <span className="text-yellow-300">Weather Today.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-white/60 text-sm max-w-sm"
        >
          Live conditions for every district — plan smarter, farm better
        </motion.p>
      </div>
    </div>
  );
}

// ─── Loading Overlay (matches PlannerPage) ────────────────────────────────────
function LoadingOverlay() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-20 bg-white/85 backdrop-blur-sm
        flex flex-col items-center justify-center gap-4 rounded-3xl"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
        className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary"
        style={{ borderTopColor: "#1a6b3a" }}
      />
      <p className="text-gray-700 font-bold text-base">Fetching weather...</p>
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: "#1a6b3a" }}
          />
        ))}
      </div>
    </motion.div>
  );
}

// ─── Weather Stat Card ────────────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, accent, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative p-4 rounded-2xl border border-border bg-card
        shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
    >
      {/* Accent glow */}
      <div
        className="absolute -top-4 -right-4 w-16 h-16 rounded-full opacity-10 group-hover:opacity-20 transition-opacity"
        style={{ backgroundColor: accent }}
      />
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
        style={{
          backgroundColor: `${accent}18`,
          border: `1px solid ${accent}30`,
        }}
      >
        <Icon size={18} style={{ color: accent }} />
      </div>
      <p className="text-xs text-muted-foreground font-medium mb-0.5">
        {label}
      </p>
      <p
        className="text-xl font-extrabold tracking-tight"
        style={{ color: accent }}
      >
        {value}
      </p>
    </motion.div>
  );
}

// ─── Main WeatherCard ─────────────────────────────────────────────────────────
export default function WeatherCard() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [position, setPosition] = useState([23.8103, 90.4125]);
  const [markerIcon, setMarkerIcon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "073a8bfbae4831acfd5d0662d23829a4";

  useEffect(() => {
    import("leaflet").then((L) => {
      const icon = new L.Icon({
        iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
      });
      setMarkerIcon(icon);
    });
  }, []);

  const fetchWeather = async (cityName) => {
    if (!cityName) return;
    try {
      setLoading(true);
      setError("");
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName},BD&units=metric&appid=${API_KEY}`,
      );
      const data = await res.json();
      if (data.cod !== 200) throw new Error(data.message);
      setWeather(data);
      setPosition([data.coord.lat, data.coord.lon]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const detectLocationWeather = () => {
    if (!navigator.geolocation || loading) return;
    setLoading(true);
    navigator.geolocation.getCurrentPosition(async (pos) => {
      try {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`,
        );
        const data = await res.json();
        if (data.cod !== 200) throw new Error(data.message);
        setWeather(data);
      } catch (err) {
        setError(err.message || "Location detection failed");
      } finally {
        setLoading(false);
      }
    });
  };

  const stats = weather
    ? [
        {
          icon: Thermometer,
          label: "Temperature",
          value: `${Math.round(weather.main.temp)}°C`,
          accent: "#16a34a",
        },
        {
          icon: Droplets,
          label: "Humidity",
          value: `${weather.main.humidity}%`,
          accent: "#2563eb",
        },
        {
          icon: Wind,
          label: "Wind Speed",
          value: `${weather.wind.speed} m/s`,
          accent: "#d97706",
        },
        {
          icon: Gauge,
          label: "Pressure",
          value: `${weather.main.pressure} hPa`,
          accent: "#7c3aed",
        },
      ]
    : [];

  return (
    <div className="min-h-screen bg-background">
      <Header></Header>
      {/* ── Banner ── */}
      <PageBanner />

      {/* ── Glass card — overlaps banner ── */}
      <div className="max-w-5xl mx-auto px-4 -mt-10 pb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="bg-card border border-border rounded-3xl shadow-2xl shadow-black/10 overflow-hidden"
        >
          {/* ── Search bar section ── */}
          <div className="bg-muted/20 border-b border-border px-6 py-5">
            <div className="flex gap-3">
              {/* Input */}
              <div className="relative flex-1">
                <Search
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && fetchWeather(city)}
                  placeholder="Search city in Bangladesh..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl
                    border border-border bg-background text-foreground text-sm
                    focus:outline-none focus:ring-2 transition
                    placeholder:text-muted-foreground"
                  style={{ "--tw-ring-color": "#1a6b3a33" }}
                />
              </div>

              {/* Search button */}
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() => fetchWeather(city)}
                disabled={loading}
                className="px-5 py-3 rounded-xl text-white font-semibold text-sm
                  shadow-md transition disabled:opacity-60 shrink-0"
                style={{ backgroundColor: "#1a6b3a" }}
              >
                {loading ? "⏳" : "Search"}
              </motion.button>
            </div>

            {/* Detect location */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={detectLocationWeather}
              disabled={loading}
              className="mt-3 w-full flex items-center justify-center gap-2
                py-2.5 rounded-xl border border-border bg-background
                text-foreground text-sm font-medium
                hover:bg-muted/40 transition disabled:opacity-60"
            >
              <Navigation
                size={14}
                className="text-primary"
                style={{ color: "#1a6b3a" }}
              />
              Detect My Location
            </motion.button>
          </div>

          {/* ── Error ── */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="px-6 pt-4"
              >
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-medium">
                  <span>⚠️</span> {error}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Content ── */}
          <div className="p-6 relative">
            <AnimatePresence>{loading && <LoadingOverlay />}</AnimatePresence>

            {/* City name + condition */}
            <AnimatePresence mode="wait">
              {weather && (
                <motion.div
                  key={weather.name}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex items-center justify-between mb-5"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{
                        backgroundColor: "#1a6b3a18",
                        border: "1px solid #1a6b3a30",
                      }}
                    >
                      <MapPin size={15} style={{ color: "#1a6b3a" }} />
                    </div>
                    <div>
                      <p className="font-extrabold text-foreground text-base leading-tight">
                        {weather.name}
                      </p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {weather.weather?.[0]?.description}
                      </p>
                    </div>
                  </div>
                  {weather.weather?.[0]?.icon && (
                    <img
                      src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                      alt="weather icon"
                      className="w-14 h-14 -my-2"
                    />
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Stat cards */}
            <AnimatePresence mode="wait">
              {weather && (
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {stats.map((s, i) => (
                    <StatCard key={s.label} {...s} delay={i * 0.07} />
                  ))}
                </div>
              )}
            </AnimatePresence>

            {/* Empty state */}
            {!weather && !loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-5 flex flex-col items-center gap-2 text-center"
              >
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center"
                  style={{
                    backgroundColor: "#1a6b3a12",
                    border: "1px solid #1a6b3a25",
                  }}
                >
                  <CloudSun size={24} className="text-yellow-500" />
                </div>

                <p className="text-foreground font-bold">
                  Search a city to see weather
                </p>
                <p className="text-muted-foreground text-sm max-w-xs">
                  Enter a Bangladesh city name above or use location detection
                </p>
              </motion.div>
            )}

            {/* Map — plain div, no motion wrapper (Leaflet manages its own DOM) */}
            <div
              className="rounded-2xl overflow-hidden border border-border shadow-sm mt-2"
              style={{ height: 480 }}
            >
              <MapContainer
                key={`${position[0]}-${position[1]}`}
                center={position}
                zoom={10}
                className="h-full w-full"
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {markerIcon && (
                  <Marker position={position} icon={markerIcon}>
                    <Popup>📍 {weather?.name ?? "Current Location"}</Popup>
                  </Marker>
                )}
              </MapContainer>
            </div>
          </div>
        </motion.div>

        {/* Footer note — matches PlannerPage */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-xs text-muted-foreground mt-5
            flex items-center justify-center gap-1.5"
        >
          <span style={{ color: "#1a6b3a" }}>🌱</span>
          Weather data powered by OpenWeatherMap — updated in real time.
        </motion.p>
      </div>
    </div>
  );
}
