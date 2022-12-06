'use strict';
var __extends =
  (this && this.__extends) ||
  (function () {
    var extendStatics = function (d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (d, b) {
            d.__proto__ = b;
          }) ||
        function (d, b) {
          for (var p in b)
            if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
      return extendStatics(d, b);
    };
    return function (d, b) {
      if (typeof b !== 'function' && b !== null)
        throw new TypeError(
          'Class extends value ' + String(b) + ' is not a constructor or null'
        );
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype =
        b === null
          ? Object.create(b)
          : ((__.prototype = b.prototype), new __());
    };
  })();
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
exports.__esModule = true;
exports.ProjectList = void 0;
var base_component_1 = require('./base-component');
var autobind_1 = require('../decorator/autobind');
var project_1 = require('../models/project');
var project_state_1 = require('../state/project-state');
var project_item_1 = require('./project-item');
var ProjectList = /** @class */ (function (_super) {
  __extends(ProjectList, _super);
  function ProjectList(type) {
    var _this =
      _super.call(this, 'project-list', 'app', false, type + '-projects') ||
      this;
    _this.type = type;
    _this.assignedProjects = [];
    _this.configure();
    _this.renderContent();
    return _this;
  }
  ProjectList.prototype.dragOverHandler = function (event) {
    if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
      event.preventDefault();
      var listEl = this.element.querySelector('ul');
      listEl.classList.add('droppable');
    }
  };
  ProjectList.prototype.dropHandler = function (event) {
    var prjId = event.dataTransfer.getData('text/plain');
    project_state_1.projectState.moveProject(
      prjId,
      this.type === 'active'
        ? project_1.ProjectStatus.Active
        : project_1.ProjectStatus.Finished
    );
  };
  ProjectList.prototype.dragLeaveHandler = function (_) {
    var listEl = this.element.querySelector('ul');
    listEl.classList.remove('droppable');
  };
  ProjectList.prototype.configure = function () {
    var _this = this;
    this.element.addEventListener('dragover', this.dragOverHandler);
    this.element.addEventListener('dragleave', this.dragLeaveHandler);
    this.element.addEventListener('drop', this.dropHandler);
    project_state_1.projectState.addListener(function (projects) {
      var relevantProjects = projects.filter(function (prj) {
        if (_this.type === 'active') {
          return prj.status === project_1.ProjectStatus.Active;
        }
        return prj.status === project_1.ProjectStatus.Finished;
      });
      _this.assignedProjects = relevantProjects;
      _this.renderProjects();
    });
  };
  ProjectList.prototype.renderContent = function () {
    var listId = this.type + '-project-list';
    this.element.querySelector('ul').id = listId;
    this.element.querySelector('h2').textContent =
      this.type.toUpperCase() + ' PROJECTS';
  };
  ProjectList.prototype.renderProjects = function () {
    var listEl = document.getElementById(this.type + '-project-list');
    listEl.innerHTML = '';
    for (var _i = 0, _a = this.assignedProjects; _i < _a.length; _i++) {
      var prjItem = _a[_i];
      new project_item_1.ProjectItem(
        this.element.querySelector('ul').id,
        prjItem
      );
    }
  };
  __decorate([autobind_1.autobind], ProjectList.prototype, 'dragOverHandler');
  __decorate([autobind_1.autobind], ProjectList.prototype, 'dropHandler');
  __decorate([autobind_1.autobind], ProjectList.prototype, 'dragLeaveHandler');
  return ProjectList;
})(base_component_1.Component);
exports.ProjectList = ProjectList;
