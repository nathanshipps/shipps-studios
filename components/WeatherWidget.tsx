"use client";

import { useEffect, useState } from "react";

interface WeatherData {
  city: string;
  temp: number;
  condition: string;
}

const WMO: Record<number, string> = {
  0: "Clear",
  1: "Mostly Clear", 2: "Partly Cloudy", 3: "Overcast",
  45: "Foggy", 48: "Icy Fog",
  51: "Light Drizzle", 53: "Drizzle", 55: "Heavy Drizzle",
  61: "Light Rain", 63: "Rain", 65: "Heavy Rain",
  71: "Light Snow", 73: "Snow", 75: "Heavy Snow",
  77: "Snow Grains",
  80: "Showers", 81: "Rain Showers", 82: "Heavy Showers",
  85: "Snow Showers", 86: "Heavy Snow Showers",
  95: "Thunderstorm", 96: "Thunderstorm w/ Hail", 99: "Severe Thunderstorm",
};

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=45.5231&longitude=-122.6765&current=temperature_2m,weather_code&temperature_unit=fahrenheit&timezone=America%2FLos_Angeles`
        );
        const data = await weatherRes.json();

        setWeather({
          city: "Portland",
          temp: Math.round(data.current.temperature_2m),
          condition: WMO[data.current.weather_code as number] ?? "—",
        });
      } catch {
        // fail silently
      }
    };

    load();
  }, []);

  if (!weather) return (
    <p className="font-mono text-[10px] tracking-[0.15em]" style={{ color: "var(--fg-faint)" }}>
      — °F &middot; —
    </p>
  );

  return (
    <p className="font-mono text-[10px] tracking-[0.15em]" style={{ color: "var(--fg-faint)" }}>
      {weather.city} &middot; {weather.temp}°F &middot; {weather.condition}
    </p>
  );
}
