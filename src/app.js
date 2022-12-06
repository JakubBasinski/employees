"use strict";
exports.__esModule = true;
var project_input_1 = require("./components/project-input");
var project_list_1 = require("./components/project-list");
new project_input_1.ProjectInput();
new project_list_1.ProjectList('active');
new project_list_1.ProjectList('finished');
// Component Base Class
