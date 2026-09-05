import { Component } from '@angular/core';

@Component({
  selector: 'app-data',
  standalone: true,
  imports: [],
  templateUrl: './data.component.html',
  styleUrl: './data.component.css'
})
export class DataComponent {

  users: any[] = [];  // empty array

  async getUsers() {

    const response = await fetch(
      'https://jsonplaceholder.typicode.com/users'
    );

    this.users = await response.json();

  }

  // get_data(){
  //   alert("welcome")
  // }

}
