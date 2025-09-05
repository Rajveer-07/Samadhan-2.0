import { Droppable } from 'react-beautiful-dnd';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Column } from '@/types/task';
import TaskCard from './TaskCard';

interface TaskColumnProps {
  column: Column;
  onAddTask: (status: string) => void;
}

const TaskColumn = ({ column, onAddTask }: TaskColumnProps) => {
  // Column headers ke liye colors - design system se
  const getColumnHeaderColor = (status: string) => {
    switch (status) {
      case 'todo': return 'border-l-status-todo';
      case 'progress': return 'border-l-status-progress';
      case 'done': return 'border-l-status-done';
      default: return 'border-l-muted';
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Column Header */}
      <div className={`p-4 border-l-4 ${getColumnHeaderColor(column.id)} bg-column-bg rounded-t-lg`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-foreground">{column.title}</h2>
            <Badge variant="secondary" className="text-xs">
              {column.tasks.length}
            </Badge>
          </div>
          
          {/* Add task button - har column me */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onAddTask(column.id)}
            className="h-8 w-8 p-0 hover:bg-primary/10"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Tasks Container - yaha pe drop hoga */}
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 p-4 bg-column-bg rounded-b-lg transition-colors ${
              snapshot.isDraggingOver ? 'bg-primary/5' : ''
            }`}
            style={{ minHeight: '200px' }}
          >
            {/* Task cards */}
            {column.tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
            
            {provided.placeholder}
            
            {/* Empty state message */}
            {column.tasks.length === 0 && (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  No tasks here yet
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onAddTask(column.id)}
                  className="text-xs"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add first task
                </Button>
              </div>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskColumn;