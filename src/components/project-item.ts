
/*
 **  [projectItem] extends Component
 **
 **
 */

 import { AutoBind } from "decorators/autobind";
import { Dragable } from "models/drag-drop";
 import { Project } from "state/project-state";
 import { Component } from "./base-component";
 
 class PorjectItem
 extends Component<HTMLUListElement, HTMLLIElement>
 implements Dragable
{
 private project: Project;

 get persoon() {
   if (this.project.people === 1) {
     return `1 Person`;
   } else {
     return `${this.project.people} Persons`;
   }
 }
 constructor(hostId: string, project: Project) {
   super('single-project', hostId, false, project.id);
   this.project = project;

   this.configure();
   this.renderContent();
 }

 @AutoBind
 dragStartHandler(event: DragEvent): void {
   event.dataTransfer!.setData('text/plain', this.project.id);
   event.dataTransfer!.effectAllowed = 'move';
 }

 @AutoBind
 dragEndHandler(event: DragEvent): void {
   console.log(event);
 }

 configure(): void {
   this.element.addEventListener('dragstart', this.dragStartHandler);
   this.element.addEventListener('dragend', this.dragEndHandler);
 }
 renderContent(): void {
   this.element.querySelector('h2')!.textContent = this.project.title;
   this.element.querySelector('h3')!.textContent = this.persoon;
   this.element.querySelector('p')!.textContent = this.project.description;
 }
}
