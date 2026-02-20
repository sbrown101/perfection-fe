import { useState, useEffect, useMemo, useCallback } from "react";
import type { Task } from "../types/Task";

interface Props {
  tasks: Task[];
}

export function TaskTable({ tasks }: Props) {
  // Derive the available task types from incoming tasks
  const taskTypes = useMemo(
    () => [...new Set(tasks.map((task) => task.type))],
    [tasks]
  );

  // Derive available seasons from tasks' conditions
  const seasonOptions = useMemo(
    () => [
      ...new Set(
        tasks.flatMap((task) =>
          task.conditions.flatMap((c) => (c.seasons ?? []) as string[])
        )
      ),
    ],
    [tasks]
  );

  // Derive available weather from tasks' conditions; if none found, fall back to all known weathers
  const weatherOptions = useMemo(() => {
    const derived = [
      ...new Set(
        tasks.flatMap((task) =>
          task.conditions.flatMap((c) => (c.weather ?? []) as string[])
        )
      ),
    ];
    // Fallback to known weather options if tasks don't specify any
    return derived.length > 0 ? derived : ["sunny", "rain", "storm", "snow"];
  }, [tasks]);

  // Selection state: default to "all types" and reset when tasks (types) change
  const [selectedTypes, setSelectedTypes] = useState<string[]>(taskTypes);
  useEffect(() => {
    setSelectedTypes(taskTypes);
  }, [taskTypes]);

  // Selection state for seasons: default to all available seasons and reset when options change
  const [selectedSeasons, setSelectedSeasons] = useState<string[]>(seasonOptions);
  useEffect(() => {
    setSelectedSeasons(seasonOptions);
  }, [seasonOptions]);

  // Selection state for weather: default to all available weather and reset when options change
  const [selectedWeather, setSelectedWeather] = useState<string[]>(weatherOptions);
  useEffect(() => {
    setSelectedWeather(weatherOptions);
  }, [weatherOptions]);

  // Derive filtered tasks instead of storing in state
  const filteredTasks = useMemo(
    () =>
      tasks.filter((task) => {
        // Must match type
        const matchesType = selectedTypes.includes(task.type);

        // Season matching: if any condition has no seasons, it's available in all seasons.
        const matchesSeason = task.conditions.some((c) => {
          const seasons = (c.seasons ?? []) as string[];
          if (seasons.length === 0) return true; // available in all seasons
          return seasons.some((s) => selectedSeasons.includes(s));
        });

        // Weather matching: if any condition has no weather, it's available in all weather.
        const matchesWeather = task.conditions.some((c) => {
          const weather = (c.weather ?? []) as string[];
          if (weather.length === 0) return true; // available in all weather
          return weather.some((w) => selectedWeather.includes(w));
        });

        return matchesType && matchesSeason && matchesWeather;
      }),
    [tasks, selectedTypes, selectedSeasons, selectedWeather]
  );

  // Toggle a type selection (functional update to avoid stale closures)
  const toggleType = useCallback((type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.length > 1
          ? prev.filter((t) => t !== type)
          : prev
        : [...prev, type]
    );
  }, []);

  // Toggle a season selection
  const toggleSeason = useCallback((season: string) => {
    setSelectedSeasons((prev) =>
      prev.includes(season)
        ? prev.length > 1
          ? prev.filter((s) => s !== season)
          : prev
        : [...prev, season]
    );
  }, []);

  // Toggle a weather selection
  const toggleWeather = useCallback((weather: string) => {
    setSelectedWeather((prev) =>
      prev.includes(weather)
        ? prev.length > 1
          ? prev.filter((w) => w !== weather)
          : prev
        : [...prev, weather]
    );
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          marginBottom: "10px",
          overflowX: "auto",
        }}
      >
        {taskTypes.map((type) => (
          <button
            key={type}
            style={{
              padding: "8px 16px",
              marginRight: "5px",
              border: selectedTypes.includes(type)
                ? "1px solid #007bff"
                : "1px solid #ccc",
              borderRadius: "4px",
              backgroundColor: selectedTypes.includes(type)
                ? "#007bff"
                : "#f8f8f8",
              color: selectedTypes.includes(type) ? "white" : "inherit",
              cursor: "pointer",
            }}
            onClick={() => toggleType(type)}
            data-testid={`type-tab-${type}`}
          >
            {type}
          </button>
        ))}
      </div>
      {/* Season filter row */}
      <div
        style={{
          display: "flex",
          marginBottom: "10px",
          overflowX: "auto",
        }}
      >
        {seasonOptions.map((season) => (
          <button
            key={season}
            style={{
              padding: "8px 16px",
              marginRight: "5px",
              border: selectedSeasons.includes(season)
                ? "1px solid #007bff"
                : "1px solid #ccc",
              borderRadius: "4px",
              backgroundColor: selectedSeasons.includes(season)
                ? "#007bff"
                : "#f8f8f8",
              color: selectedSeasons.includes(season) ? "white" : "inherit",
              cursor: "pointer",
            }}
            onClick={() => toggleSeason(season)}
            data-testid={`season-tab-${season}`}
          >
            {season}
          </button>
        ))}
      </div>
      {/* Weather filter row */}
      <div
        style={{
          display: "flex",
          marginBottom: "10px",
          overflowX: "auto",
        }}
      >
        {weatherOptions.map((weather) => (
          <button
            key={weather}
            style={{
              padding: "8px 16px",
              marginRight: "5px",
              border: selectedWeather.includes(weather)
                ? "1px solid #007bff"
                : "1px solid #ccc",
              borderRadius: "4px",
              backgroundColor: selectedWeather.includes(weather)
                ? "#007bff"
                : "#f8f8f8",
              color: selectedWeather.includes(weather) ? "white" : "inherit",
              cursor: "pointer",
            }}
            onClick={() => toggleWeather(weather)}
            data-testid={`weather-tab-${weather}`}
          >
            {weather}
          </button>
        ))}
      </div>
      <table>
        <thead>
          <tr>
            <th>Task</th>
            <th>Type</th>
            <th>Conditions</th>
          </tr>
        </thead>
        <tbody data-testid="task-table-body">
          {filteredTasks.map((task) => (
            <tr key={task.id} data-testid={`task-${task.id}`}>
              <td>
                {task.link ? (
                  <a href={task.link} target="_blank" rel="noreferrer">
                    {task.displayName}
                  </a>
                ) : (
                  task.displayName
                )}
              </td>

              <td>{task.type}</td>

              <td>
                {task.conditions.map((c, i) => (
                  <div key={i}>
                    <span>
                      Seasons: {c.seasons?.length ? c.seasons.join(", ") : "All"}
                    </span>{" "}
                    |{" "}
                    <span>
                      Locations: {c.locations?.length ? c.locations.join(", ") : "All"}
                    </span>{" "}
                    |{" "}
                    <span>
                      Weather: {c.weather?.length ? c.weather.join(", ") : "All"}
                    </span>{" "}
                    |{" "}
                    <span>
                      Time: {c.time?.length ? c.time.join(", ") : "All"}
                    </span>
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
