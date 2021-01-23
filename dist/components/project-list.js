var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ProjectStatus } from "../models/project.js";
import { Component } from "./base.js";
import { autobind } from "../decorator/autobind.js";
import { projectState } from "../state/project-state.js";
import { ProjectItem } from "./project-item.js";
export class ProjectList extends Component {
    constructor(type) {
        super("project-list", "app", false, `${type}-projects`);
        this.type = type;
        this.assignedProjects = [];
        this.renderList();
        this.renderSection();
    }
    dragOver(e) {
        if (e.dataTransfer && e.dataTransfer.types[0] === "text/plain") {
            e.preventDefault();
            const ulEl = this.sectionEl.querySelector("ul");
            ulEl.classList.add("drop");
        }
    }
    drop(e) {
        const projectId = e.dataTransfer.getData("text/plain");
        projectState.moveProject(projectId, this.type === "Active" ? ProjectStatus.Active : ProjectStatus.Finished);
    }
    dragLeave(_) {
        const ulEl = this.sectionEl.querySelector("ul");
        ulEl.classList.remove("drop");
    }
    renderList() {
        this.sectionEl.addEventListener("dragover", this.dragOver);
        this.sectionEl.addEventListener("dragleave", this.dragLeave);
        this.sectionEl.addEventListener("drop", this.drop);
        projectState.addListener((projects) => {
            const filteredProjects = projects.filter((project) => {
                if (this.type === "Active") {
                    return project.status === ProjectStatus.Active;
                }
                else {
                    return project.status === ProjectStatus.Finished;
                }
            });
            this.assignedProjects = filteredProjects;
            this.renderProjects();
        });
    }
    renderSection() {
        const listId = `${this.type}-projects-list`;
        this.sectionEl.querySelector("ul").id = listId;
        this.sectionEl.querySelector("h2").textContent = `${this.type} Projects`;
    }
    renderProjects() {
        const projectListEl = document.getElementById(`${this.type}-projects-list`);
        projectListEl.innerHTML = "";
        for (const projectItem of this.assignedProjects) {
            new ProjectItem(this.sectionEl.querySelector("ul").id, projectItem);
        }
    }
}
__decorate([
    autobind
], ProjectList.prototype, "dragOver", null);
__decorate([
    autobind
], ProjectList.prototype, "drop", null);
__decorate([
    autobind
], ProjectList.prototype, "dragLeave", null);
//# sourceMappingURL=project-list.js.map