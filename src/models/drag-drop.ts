// import { DragTartget, Dragable } from './drag-drop.js';

import { ProjectStatus } from '../state/project-state';

/*
 **  [Drag & Drop] [Interfaces]
 **
 **
 */

export interface Dragable {
  dragStartHandler(event: DragEvent): void;
  dragEndHandler(event: DragEvent): void;
}

export interface DragTartget {
  dragOverHandler(event: DragEvent): void;
  dropHandler(event: DragEvent): void;
  dragLeaveHandler(event: DragEvent): void;
}
