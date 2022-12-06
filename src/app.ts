import { ProjectInput } from './components/project-input';
import { ProjectList } from './components/project-list';
import {} from './models/project';
import { projectState } from './state/project-state';

new ProjectInput();
new ProjectList('active');
new ProjectList('finished');
new ProjectList('trash');

// To ma isc gdzie indziej .

const activeItems = document.getElementById('active-project-list')!;
const finishedItems = document.getElementById('finished-project-list')!;
const trashItems = document.getElementById('trash-project-list')!;
const lists = [activeItems, finishedItems, trashItems];

const trashBtn = document.getElementById('smietnik');

function updatePeople() {
  const veryBusyWorkers = document.getElementById('busyWorkers');
  const availableWorkers = document.getElementById('availableWorkers');
  let peopleList = trashItems.querySelectorAll('.numOfPeople');
  let allPeople = 0;
  peopleList.forEach((e) => {
    allPeople += parseInt(e.innerHTML);
    console.log(allPeople);
    return allPeople;
  });
  let updatedBusyWorkers = parseInt(veryBusyWorkers!.innerHTML) - allPeople;
  let updatedAvailableWorkers =
    parseInt(availableWorkers!.innerHTML) + allPeople;
  console.log(updatedBusyWorkers, veryBusyWorkers!.innerHTML, allPeople);
  veryBusyWorkers!.innerHTML = updatedBusyWorkers.toString();
  availableWorkers!.innerHTML = updatedAvailableWorkers.toString();
}

trashBtn!.addEventListener('click', () => {
  updatePeople();
  trashItems.innerHTML;
  trashItems.innerHTML = '';
  if (trashItems.classList.contains('droppable')) {
    trashItems.classList.remove('droppable');
  }
  const numbers = projectState.numberToDelete();
  for (let i = 0; i < numbers; i++) {
    projectState.deleteProject();
  }
});

// Drag and Drop cursor

let mouseDown = false;

lists.forEach((item) => {
  item.addEventListener('mousedown', () => {
    mouseDown = true;
    item.classList.add('grabbing');
  });

  document.documentElement.addEventListener('mouseout', function () {
    if (mouseDown) {
      item.classList.remove('grabbing');
    }
  });

  document.documentElement.addEventListener('mouseup', function () {
    mouseDown = false;
    item.classList.remove('grabbing');
  });

  document.documentElement.addEventListener('mouseover', function (e) {
    if (e.target == this && e.relatedTarget == null) {
      if (mouseDown && !e.button) {
        mouseDown = false;
      }
    }
  });
});
