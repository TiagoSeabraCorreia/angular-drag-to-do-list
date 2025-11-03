import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, CdkDrag, CdkDropList, CdkDropListGroup],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('drag-drop-todo');

  backlog: Task[] = [
    { id: 1, title: 'Buy groceries', description: 'Milk, eggs, bread, fruits' },
    { id: 2, title: 'Finish report', description: 'Summarize lab results' },
    { id: 3, title: 'Clean workspace', description: 'Organize desk and shelves' },
  ];

  forToday: Task[] = [
    { id: 4, title: 'Workout', description: 'Run 30 minutes' },
  ];

  inProgress: Task[] = [
    { id: 5, title: 'Fix login bug', description: 'Debug login form' },
  ];

  completed: Task[] = [
    { id: 6, title: 'Backup files', description: 'Saved to external drive' },
  ];

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}

interface Task {
  id: number;
  title: string;
  description: string;
}
