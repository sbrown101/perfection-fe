import { useState } from "react";
import { sendToBackend } from "../api/analysisApi";
import type { Task } from "@shared/Task";

interface Props {
  onTasksLoaded: (tasks: Task[]) => void;
}

export function SaveUpload({ onTasksLoaded }: Props) {
    const [status, setStatus] = useState<string>("No file selected");
    const [xmlText, setXmlText] = useState<string | null>(null);
    const [tasks, setTasks] = useState<Task[]>([]);

    function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            const text = reader.result as string;

            if (!isValidXml(text)) {
              setStatus("File is not valid XML");
              return;
            }

            setXmlText(text);
            setStatus("File loaded");
        };
        reader.onerror = () => setStatus("Failed to read file");

        reader.readAsText(file);
    }

  function isValidXml(input: string): boolean {
    const parser = new DOMParser();
    const doc = parser.parseFromString(input, "application/xml");
    return !doc.querySelector("parsererror");
  }

    async function handleAnalyse() {
        if (!xmlText) return;
        setStatus("Analysing...");
        try {
            const res = await sendToBackend(xmlText);
            setTasks(res);
            onTasksLoaded(res);
            setStatus("Analysis complete");
        } catch (err) {
            setStatus("Analysis failed");
            console.error(err)
        }
    }

    return (
      <div>
          <input
            data-testid="file-input"
            type="file"
            accept=".xml"
            onChange={handleFile}
          />
          <button
            data-testid="analyse-button"
            disabled={!xmlText}
            onClick={handleAnalyse}
          >
              Analyse Save
          </button>
          <p data-testid="status-text">{status}</p>
      </div>
    );
}
