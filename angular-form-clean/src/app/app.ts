import { Component } from '@angular/core';
import { UserFormComponent } from './user-form/user-form';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UserFormComponent],
  template: `<app-user-form></app-user-form>`,
  styles: []
})
export class App {}