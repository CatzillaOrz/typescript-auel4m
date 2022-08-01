/*
 **  [ProjectList] extends Component
 **
 **
 */

import { AutoBind } from 'decorators/autobind';
import { DragTartget } from 'models/drag-drop';
import { Project, projectState, ProjectStatus } from 'state/project-state';
import { Component } from './base-component';

class ProjectList
  extends Component<HTMLDivElement, HTMLElement>
  implements DragTartget
{
  assignedProjects: any[];

  constructor(private type: 'active' | 'finished') {
    super('project-list', 'app', false, `${type}-projects`);
    this.assignedProjects = [];
    this.configure();
    this.renderContent();
  }

  @AutoBind
  dragOverHandler(event: DragEvent): void {
    if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
      event.preventDefault();
      const listEl = this.element.querySelector('ul')!;
      listEl.classList.add('droppable');
    }
  }

  @AutoBind
  dropHandler(event: DragEvent): void {
    const prjId = event.dataTransfer!.getData('text/plain');
    projectState.moveProject(
      prjId,
      this.type === 'active' ? ProjectStatus.Actice : ProjectStatus.Finished
    );
  }

  @AutoBind
  dragLeaveHandler(event: DragEvent): void {
    const listEl = this.element.querySelector('ul')!;
    listEl.classList.remove('droppable');
  }

  private renderProjects() {
    const listEl = document.getElementById(
      `${this.type}-projects-list`
    )! as HTMLUListElement;
    listEl.innerHTML = '';
    for (const projItem of this.assignedProjects) {
      new PorjectItem(this.element.querySelector('ul')!.id, projItem);
    }
  }

  configure(): void {
    this.element.addEventListener('dragover', this.dragOverHandler);
    this.element.addEventListener('dragleave', this.dragLeaveHandler);
    this.element.addEventListener('drop', this.dropHandler);
    projectState.addListener((projects: Project[]) => {
      const relevantProject = projects.filter((prj) => {
        if (this.type === 'active') {
          return prj.status === ProjectStatus.Actice;
        }
        return prj.status === ProjectStatus.Finished;
      });
      this.assignedProjects = relevantProject;
      this.renderProjects();
    });
  }
  renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h2')!.textContent =
      this.type.toUpperCase() + ' PROJECTS';
  }
}
