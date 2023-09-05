import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { RadioComponent } from './../../../shared/radio-group/radio.component';
import { MatRadioChange, MatRadioModule } from '@angular/material/radio';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { Component } from '@angular/core';
import { priorityList, THEMES_PRIORITY_MAP, TaskPriority, PRIORITY_LABEL_MAP } from 'src/app/shared/constants/priority';

export const FILTERS_KEY = 'filters'
export type Filter = TaskPriority | 'all'

@Component({
  standalone: true,
  imports: [ModalComponent, MatRadioModule, RadioComponent, NgFor, FormsModule],
  selector: 'app-filters-modal',
  templateUrl: './filters-modal.component.html',
  styleUrls: ['./filters-modal.component.scss']
})
export class FiltersModalComponent {
  priorityList = priorityList;
  selectedFilter: Filter = 'all';

  constructor(){}

  getRadioTheme(priority: TaskPriority) {
    return THEMES_PRIORITY_MAP[priority]
  }

  getPriorityLabel(priority: TaskPriority) {
    return PRIORITY_LABEL_MAP[priority]
  }

  onClickAll() {
    this.selectedFilter = 'all'
  }

  // changeRadio(change: MatRadioChange) {
  //   this.selectedFilter = change.value
  // }
}
