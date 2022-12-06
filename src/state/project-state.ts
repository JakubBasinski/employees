import { Project, ProjectStatus } from '../models/project';

type Listener<T> = (items: T[]) => void;

class State<T> {
  protected listeners: Listener<T>[] = [];
  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}

export class ProjectState extends State<Project> {
  private projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {
    super();
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  addProject(title: string, description: string, numOfPeople: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      numOfPeople,
      ProjectStatus.Active
    );
    this.projects.push(newProject);

    this.updateListeners();
  }

  numberToDelete() {
    let a = this.projects.length;
    return a;
  }

  deleteProject() {
    this.projects.forEach((element) => {
      const elementId = this.projects.indexOf(element);
      if (element.status == 2) {
        this.projects.splice(elementId, 1);
      }
    });
  }

  moveProject(projectId: string, newStatus: string) {
    const project = this.projects.find((prj) => prj.id === projectId);

    if (newStatus === 'active') {
      (project!.status = ProjectStatus.Active), this.updateListeners();
    } else if (newStatus === 'finished') {
      (project!.status = ProjectStatus.Finished), this.updateListeners();
    } else (project!.status = ProjectStatus.Trash), this.updateListeners();
  }

  private updateListeners() {
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice());
    }
  }
}

export const projectState = ProjectState.getInstance();
