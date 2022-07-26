class ProjectInput {
  templateElment: HTMLTemplateElement;
  hostElment: HTMLDivElement;

  constructor() {
    this.templateElment = document.getElementById(
      'project-input'
    )! as HTMLTemplateElement;
    this.hostElment = document.getElementById('app')! as HTMLDivElement;
  }
}
