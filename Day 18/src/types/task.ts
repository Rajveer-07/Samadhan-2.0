// Task management system types - thoda simple रखा है bas :)
export type TaskStatus = 'todo' | 'progress' | 'done';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  assignee?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Column {
  id: TaskStatus;
  title: string;
  tasks: Task[];
}

// Team collaboration - sabko track karna hai ki kaun kya kar rha
export interface TeamMember {
  id: string;
  name: string;
  avatar?: string;
}