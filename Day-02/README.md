
### Step 1: Install Angular CLI

First, ensure you have Node.js installed. Then, install Angular CLI globally on your system using the following command:

```bash
npm install -g @angular/cli
```

### Step 2: Create a New Angular Project

Create a new Angular project by running the following command:

```bash
ng new my-angular-app
```

You will be prompted to configure some options (like whether to include routing and which stylesheet format to use). Choose according to your needs.

### Step 3: Navigate to the Project Directory

Move into the project directory:

```bash
cd my-angular-app
```

### Step 4: Generate a New Service for API Calls

Generate a service that will handle the API requests:

```bash
ng generate service api
```

This will create two files: `api.service.ts` and `api.service.spec.ts` in the `src/app` directory.

### Step 5: Implement the API Call in the Service

Open the `api.service.ts` file and write the following code to fetch data from an API:

```typescript
// src/app/api.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
```

### Step 6: Use the Service in a Component

Now, let's fetch the data in a component. You can use the default `AppComponent` or generate a new one.

To generate a new component, use the following command:

```bash
ng generate component user-list
```

In the `user-list.component.ts` file, inject the `ApiService` and fetch the data:

```typescript
// src/app/user-list/user-list.component.ts

import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: any[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }
}
```

### Step 7: Display the Data in the Component Template

In the `user-list.component.html` file, add the following code to display the fetched data:

```html
<!-- src/app/user-list/user-list.component.html -->

<div>
  <h2>User Data:</h2>
  <ul>
    <li *ngFor="let user of users">{{ user.name }} - {{ user.email }}</li>
  </ul>
</div>
```

### Step 8: Add the Component to the Main App Template

To display the `UserListComponent`, add its selector to the `app.component.html` file:

```html
<!-- src/app/app.component.html -->

<app-user-list></app-user-list>
```

### Step 9: Run the Angular Application

Finally, run the application using the following command:

```bash
ng serve
```

Navigate to `http://localhost:4200/` in your web browser. You should see a list of users fetched from the API.

### How It Works

1. **Service**: The `ApiService` is responsible for making the HTTP GET request to the API using Angular's `HttpClient`.
2. **Component**: The `UserListComponent` subscribes to the `getUsers` method of the `ApiService`, which returns an Observable. When data is received, it’s assigned to the `users` array.
3. **Template**: The data is displayed using `*ngFor`, which loops over the `users` array.

### Conclusion

This example demonstrates how to use Angular CLI to create a service and component that fetch data from an API. You can expand upon this by adding more features like error handling, loading indicators, and pagination.