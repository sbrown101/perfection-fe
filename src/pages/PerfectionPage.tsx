import { useState } from "react";
import { SaveUpload } from "../components/SaveUpload";
import { TaskTable } from "../components/TaskTable";
import type { Task } from "@shared/Task";

export function PerfectionPage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  return (
    <div>
      <h1>Stardew Perfection Helper</h1>
      <SaveUpload onTasksLoaded={setTasks} />
      {tasks.length > 0 && <TaskTable tasks={tasks} />}
    </div>
  );
}
