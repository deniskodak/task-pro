import { Themes } from '../radio-group/radio.component';

export enum TaskPriority {
  Low = 'low',
  Medium = 'medium',
  High = 'high',
  Without = 'without',
}

export const THEMES_PRIORITY_MAP = {
  [TaskPriority.High]: Themes.Green,
  [TaskPriority.Medium]: Themes.Pink,
  [TaskPriority.Low]: Themes.Blue,
  [TaskPriority.Without]: Themes.Gray,
};

export const PRIORITY_LABEL_MAP = {
  [TaskPriority.High]: TaskPriority.High,
  [TaskPriority.Medium]: TaskPriority.Medium,
  [TaskPriority.Low]: TaskPriority.Low,
  [TaskPriority.Without]: TaskPriority.Without + ' priority',
};

export const priorityList = Object.values(TaskPriority);
