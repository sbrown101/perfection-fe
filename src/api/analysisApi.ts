import type { Task } from "../types/Task";

export async function sendToBackend(xml: string): Promise<Task[]> {
    const res = await fetch("http://localhost:8080/analyze", {
        method: "POST",
        headers: {
            "Content-Type": "text/xml"
        },
        body: xml
    });

    if (!res.ok) {
        throw new Error("Backend error");
    }

    return res.json();
}
