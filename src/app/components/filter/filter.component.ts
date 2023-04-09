import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataStoreService } from 'src/app/services/data-store.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  filterForm = new FormGroup({
    filterValue: new FormControl('', Validators.required),
  });

  constructor(private dataService: DataStoreService) {}

  onSubmit(): void {
    this.dataService.newFilterValue(this.filterForm.value.filterValue);
  }

  onSearchInput(event) {
    if (event.target.value == '') {
      this.clearInput();
    }
  }

  clearInput(): void {
    this.filterForm.reset();
    this.dataService.newFilterValue(this.filterForm.value.filterValue);
    this.dataService.resetFilterState(true);
  }
}
