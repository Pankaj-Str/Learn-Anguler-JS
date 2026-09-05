import { Component } from '@angular/core';

@Component({
  selector: 'app-apidata',
  standalone: true,
  imports: [],
  templateUrl: './apidata.component.html',
  styleUrl: './apidata.component.css'
})
export class ApidataComponent {

  users: any[] = [];

  async getUsers() {

    const response = await fetch(
      'https://jsonplaceholder.typicode.com/users'
    );

    this.users = await response.json();

  }

}
