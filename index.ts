// autobind decortator

function AutoBind(
  _target: any,
  _method: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  const adjustedDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const bindFn = originalMethod.bind(this);
      return bindFn;
    },
  };
  return adjustedDescriptor;
}

class ProjectInput {
  templateElment: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

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

    this.element.id = 'user-input';

    this.titleInputElement = this.element.querySelector(
      '#title'
    ) as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      '#description'
    ) as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      '#people'
    ) as HTMLInputElement;

    this.configure();
    this.attach();
  }

  private attach() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
  }

  @AutoBind
  private submitHandler(event: Event) {
    event.preventDefault();
    console.log(this.titleInputElement.value);
  }

  private configure() {
    this.element.addEventListener('submit', this.submitHandler);
  }
}

const projInput = new ProjectInput();
