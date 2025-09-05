import { Draggable } from 'react-beautiful-dnd';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Task } from '@/types/task';
import { Clock, User } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  index: number;
}

const TaskCard = ({ task, index }: TaskCardProps) => {
  // Status colors mapping - simple design approach
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'todo': return 'bg-status-todo';
      case 'progress': return 'bg-status-progress'; 
      case 'done': return 'bg-status-done';
      default: return 'bg-muted';
    }
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`mb-3 transition-all duration-200 ${
            snapshot.isDragging ? 'rotate-2 scale-105' : ''
          }`}
        >
          <Card className={`p-4 cursor-grab active:cursor-grabbing hover:bg-task-hover transition-colors ${
            snapshot.isDragging ? 'shadow-xl bg-card' : 'shadow-sm'
          }`}>
            <div className="space-y-2">
              {/* Task title aur status indicator */}
              <div className="flex items-start justify-between">
                <h3 className="font-medium text-sm text-card-foreground leading-5">
                  {task.title}
                </h3>
                <div className={`w-3 h-3 rounded-full ${getStatusColor(task.status)}`} />
              </div>
              
              {/* Description - agar hai toh show करो */}
              {task.description && (
                <p className="text-xs text-muted-foreground leading-4">
                  {task.description}
                </p>
              )}
              
              {/* Footer with assignee and timestamp */}
              <div className="flex items-center justify-between pt-2">
                {task.assignee && (
                  <div className="flex items-center gap-1">
                    <Avatar className="h-5 w-5">
                      <AvatarImage src="" alt={task.assignee} />
                      <AvatarFallback className="text-xs bg-primary/10">
                        {task.assignee.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground">{task.assignee}</span>
                  </div>
                )}
                
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{new Date(task.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;