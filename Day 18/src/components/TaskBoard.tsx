import { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Users, Clock } from 'lucide-react';
import { Task, TaskStatus, Column } from '@/types/task';
import { v4 as uuidv4 } from 'uuid';
import TaskColumn from './TaskColumn';
import AddTaskModal from './AddTaskModal';

const TaskBoard = () => {
  // Initial sample data - demo ke liye
  const [columns, setColumns] = useState<Column[]>([
    {
      id: 'todo',
      title: 'To Do',
      tasks: [
        {
          id: '1',
          title: 'Design system setup karna hai',
          description: 'Colors, fonts aur components ready karne hai',
          status: 'todo',
          assignee: 'Rahul',
          createdAt: new Date('2024-01-15'),
          updatedAt: new Date('2024-01-15'),
        },
        {
          id: '2',
          title: 'API integration complete karna hai',
          description: 'Backend se data fetch karne ka kaam bacha hai',
          status: 'todo',
          assignee: 'Priya',
          createdAt: new Date('2024-01-16'),
          updatedAt: new Date('2024-01-16'),
        },
      ],
    },
    {
      id: 'progress',
      title: 'In Progress',
      tasks: [
        {
          id: '3',
          title: 'Drag & drop functionality',
          description: 'React beautiful dnd integrate kar rahe hai',
          status: 'progress',
          assignee: 'Amit',
          createdAt: new Date('2024-01-14'),
          updatedAt: new Date('2024-01-17'),
        },
      ],
    },
    {
      id: 'done',
      title: 'Done',
      tasks: [
        {
          id: '4',
          title: 'Project setup complete',
          description: 'Vite, React, TypeScript ready hai',
          status: 'done',
          assignee: 'Sneha',
          createdAt: new Date('2024-01-10'),
          updatedAt: new Date('2024-01-13'),
        },
      ],
    },
  ]);

  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState<TaskStatus>('todo');

  // Drag and drop handler - main functionality yahi hai
  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    
    if (!destination) return;
    
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    setColumns(prev => {
      const newColumns = [...prev];
      
      // Source column se task remove karo
      const sourceColumn = newColumns.find(col => col.id === source.droppableId)!;
      const [movedTask] = sourceColumn.tasks.splice(source.index, 1);
      
      // Destination column me task add karo
      const destColumn = newColumns.find(col => col.id === destination.droppableId)!;
      
      // Status update karo - important for tracking
      movedTask.status = destination.droppableId as TaskStatus;
      movedTask.updatedAt = new Date();
      
      destColumn.tasks.splice(destination.index, 0, movedTask);
      
      return newColumns;
    });
  };

  // Add task handler
  const handleAddTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setColumns(prev => 
      prev.map(column => 
        column.id === newTask.status
          ? { ...column, tasks: [...column.tasks, newTask] }
          : column
      )
    );
  };

  // Column se add task trigger
  const handleColumnAddTask = (status: TaskStatus) => {
    setSelectedColumn(status);
    setIsAddTaskModalOpen(true);
  };

  // Stats calculation - dashboard ke liye
  const totalTasks = columns.reduce((sum, col) => sum + col.tasks.length, 0);
  const completedTasks = columns.find(col => col.id === 'done')?.tasks.length || 0;

  return (
    <div className="min-h-screen bg-board-bg">
      {/* Header Section */}
      <div className="bg-card border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Samadhan Task Board</h1>
              <p className="text-muted-foreground mt-1">
                Sabke tasks ek jagah track karo - simple aur effective! 🚀
              </p>
            </div>
            
            {/* Stats and Actions */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4">
                <Badge variant="outline" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {totalTasks} Total Tasks
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {completedTasks}/{totalTasks} Done
                </Badge>
              </div>
              
              <Button 
                onClick={() => {
                  setSelectedColumn('todo');
                  setIsAddTaskModalOpen(true);
                }}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Task
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Board - yaha drag drop hoga */}
      <div className="max-w-7xl mx-auto p-4">
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {columns.map((column) => (
              <div key={column.id} className="bg-card rounded-lg shadow-sm border">
                <TaskColumn 
                  column={column} 
                  onAddTask={handleColumnAddTask}
                />
              </div>
            ))}
          </div>
        </DragDropContext>
      </div>

      {/* Add Task Modal */}
      <AddTaskModal
        isOpen={isAddTaskModalOpen}
        onClose={() => setIsAddTaskModalOpen(false)}
        onAddTask={handleAddTask}
        defaultStatus={selectedColumn}
      />
    </div>
  );
};

export default TaskBoard;