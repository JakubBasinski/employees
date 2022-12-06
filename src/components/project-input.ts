import { Component } from './base-component';
import * as Validation from '../util/validation';
import { autobind } from '../decorator/autobind';
import { projectState } from '../state/project-state';

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super('project-input', 'app', true, 'user-input');
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
  }

  configure() {
    this.element.addEventListener('submit', this.submitHandler);
  }

  renderContent() {}

  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    const titleValidatable: Validation.Validatable = {
      value: enteredTitle,
      required: true,
    };

    const descriptionValidatable: Validation.Validatable = {
      value: enteredDescription,
      required: true,
      // minLength: 5,
    };

    const peopleValidatable: Validation.Validatable = {
      value: +enteredPeople,
      required: true,
      min: 0,
      max: 11,
    };

    if (!Validation.validate(titleValidatable)) {
      alert('Title is required');
    } else if (!Validation.validate(descriptionValidatable)) {
      alert('Description is required');
    } else if (!Validation.validate(peopleValidatable)) {
      alert('Please enter a number from 1 to 10');
    } else {
      return [enteredTitle, enteredDescription, +enteredPeople];
    }
  }

  private clearInput() {
    this.titleInputElement.value = '';
    this.descriptionInputElement.value = '';
    this.peopleInputElement.value = '';
  }

  countAvailableWorkerks() {
    const totalWorkers = document.getElementById('availableWorkers');
    const newWorkers = this.peopleInputElement.value;
    const numbernewWorkers = parseInt(newWorkers);
    let numbertotalWorkers = parseInt(totalWorkers!.innerHTML);
    let newNumber = numbertotalWorkers - numbernewWorkers;
    // console.log(totalWorkers?.innerHTML);
    if (newNumber! < 0) {
      alert('You do not have enough people to assign !');
      return;
    } else {
      totalWorkers!.innerHTML = newNumber.toString();
    }
  }

  countBusyWorkers() {
    const totalWorkers = document.getElementById('busyWorkers');
    const newWorkers = this.peopleInputElement.value;
    const numbernewWorkers = parseInt(newWorkers);
    let numbertotalWorkers = parseInt(totalWorkers!.innerHTML);
    let newNumber = numbertotalWorkers + numbernewWorkers;
    if (newNumber! > 20) {
      return false;
    } else {
      totalWorkers!.innerHTML = newNumber.toString();
      return true;
    }
  }

  @autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;
      this.countAvailableWorkerks();
      if (this.countBusyWorkers()) {
        projectState.addProject(title, desc, people);
        this.clearInput();
      }
    }
  }
}
