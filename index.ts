class ProjectInput {
  templateElment: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;

  constructor() {
    this.templateElment = document.getElementById(
      'project-input'
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app')! as HTMLDivElement;

    /*
     **  mportNode(importedNode: DocumentFragment, deep: boolean): DocumentFragment
     ** Returns a copy of node. If deep is true, the copy also includes the node's descendants.
     **
     */
    const importedNode = document.importNode(this.templateElment.content, true);

    this.element = importedNode.firstElementChild as HTMLFormElement;

    this.attach();
  }

  private attach() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
  }
}

const projInput = new ProjectInput();