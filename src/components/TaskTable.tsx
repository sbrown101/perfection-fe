import { useState, useEffect, useMemo, useCallback } from "react";
import type { Task } from "../types/Task";

interface Props {
  tasks: Task[];
}

export function TaskTable({ tasks }: Props) {
  // Derive the available task types from incoming tasks (no state needed)
  const taskTypes = useMemo(
    () => [...new Set(tasks.map((task) => task.type))],
    [tasks]
  );

  // Selection state: default to "all types" and reset when tasks (types) change
  const [selectedTypes, setSelectedTypes] = useState<string[]>(taskTypes);
  useEffect(() => {
    setSelectedTypes(taskTypes);
  }, [taskTypes]);

  // Derive filtered tasks instead of storing in state
  const filteredTasks = useMemo(
    () => tasks.filter((task) => selectedTypes.includes(task.type)),
    [tasks, selectedTypes]
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
