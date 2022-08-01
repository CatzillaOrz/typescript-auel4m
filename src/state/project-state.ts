/*
 **  [Project] [ProjectStatus]
 **
 **
 */

export enum ProjectStatus {
  Actice,
  Finished,
}

export class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) {}
}

/*
 **  [ProjectState] extends [State]
 **
 **
 */
type Listener<T> = (item: T[]) => void;

class State<T> {
  protected listener: Listener<T>[] = [];

  addListener(listenerFn: Listener<T>) {
    this.listener.push(listenerFn);
  }
}

export class ProjectState extends State<Project> {
  private projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {
    super();
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new ProjectState();
    }
    return this.instance;
  }

  private updateListeners() {
    for (const listenerFn of this.listener) {
      listenerFn(this.projects.slice());
    }
  }

  addProject(title: string, description: string, numOfPeople: number) {
    const newProject: Project = new Project(
      Math.random().toString(),
      title,
      description,
      numOfPeople,
      ProjectStatus.Actice
    );
    this.projects.push(newProject);
    this.updateListeners();
  }

  moveProject(projectId: string, newStatus: ProjectStatus) {
    const project = this.projects.find((prj) => prj.id === projectId);
    if (project && project.status !== newStatus) {
      project.status = newStatus;
    }
    this.updateListeners();
  }
}

/* Gloabe State */

export const projectState = ProjectState.getInstance();
