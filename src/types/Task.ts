import type { TaskCondition } from "./TaskCondition";

export interface Task {
    id: string;
    type: string;
    displayName: string;
    link?: string;
    targetId?: string;
    completed?: boolean;
    conditions: TaskCondition[];
    blocked?: boolean;
}
