# Send Data into Database -
**Complete Working Guide – Angular Form + Save to Database + Fetch Again**

# Angular 21.  

---

### Step 1: Create a Clean Angular Project (No SSR)

Open PowerShell and run these commands one by one:

```powershell
cd C:\Users\Programming\Documents\GitHub\ML\Learn-Anguler-JS

ng new angular-form-clean --ssr=false --style=css --routing=false --standalone
```

When it asks questions → just press **Enter**.

Then go inside the project:

```powershell
cd angular-form-clean
```

---

### Step 2: Generate Service and Component

```powershell
ng generate service services/user
ng generate component user-form
```

---

### Step 3: Create the Backend (Node + Express + MongoDB) -- create a new folder the Start

Open a **new PowerShell window** and run:

```powershell
mkdir angular-form-backend
cd angular-form-backend
npm init -y
npm install express mongoose cors
```

Now create a file named `server.js` and paste this complete code:

```js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/angularformdb')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

// Save data (POST)
app.post('/api/users', async (req, res) => {
  try {
    const user = new User(req.body);
    const saved = await user.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all data (GET)
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

Start the backend:

```powershell
node server.js
```

You should see:  
`MongoDB Connected`  
`Server running on http://localhost:3000`

**Keep this terminal open.**

---

### Step 4: Write the Angular Code

#### 4.1 – User Service

Open file:  
`src/app/services/user.ts`

Replace everything with this:

```ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  _id?: string;
  name: string;
  email: string;
  message: string;
  createdAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
}
```

---

#### 4.2 – User Form Component (TypeScript)

Open file:  
`src/app/user-form/user-form.ts`

Replace everything with this:

```ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService, User } from '../services/user';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css'
})
export class UserFormComponent implements OnInit {

  userForm!: FormGroup;
  users: User[] = [];
  successMessage = '';
  errorMessage = '';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });

    this.loadUsers();
  }

  onSubmit() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.userService.createUser(this.userForm.value).subscribe({
      next: (res: User) => {
        this.successMessage = 'Data saved successfully!';
        this.userForm.reset();
        this.loadUsers();
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Error saving data';
        console.error(err);
        this.loading = false;
      }
    });
  }

  loadUsers() {
    this.userService.getUsers().subscribe({
      next: (data: User[]) => {
        this.users = data;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
```

---

#### 4.3 – User Form HTML

Open file:  
`src/app/user-form/user-form.html`

Replace everything with this:

```html
<div class="container">
  <h2>User Form</h2>

  <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
    <div>
      <label>Name</label>
      <input type="text" formControlName="name" placeholder="Enter name">
      @if (userForm.get('name')?.invalid && userForm.get('name')?.touched) {
        <div class="error">Name is required</div>
      }
    </div>

    <div>
      <label>Email</label>
      <input type="email" formControlName="email" placeholder="Enter email">
      @if (userForm.get('email')?.invalid && userForm.get('email')?.touched) {
        <div class="error">Valid email is required</div>
      }
    </div>

    <div>
      <label>Message</label>
      <textarea formControlName="message" rows="4" placeholder="Enter message"></textarea>
      @if (userForm.get('message')?.invalid && userForm.get('message')?.touched) {
        <div class="error">Message is required</div>
      }
    </div>

    <button type="submit" [disabled]="loading || userForm.invalid">
      {{ loading ? 'Saving...' : 'Submit' }}
    </button>
  </form>

  @if (successMessage) {
    <p class="success">{{ successMessage }}</p>
  }
  @if (errorMessage) {
    <p class="error">{{ errorMessage }}</p>
  }

  <hr>

  <h3>Data from Database</h3>
  <button type="button" (click)="loadUsers()">Refresh</button>

  @if (users.length === 0) {
    <p>No data found.</p>
  }

  @if (users.length > 0) {
    <table border="1" cellpadding="8">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Message</th>
          <th>Created At</th>
        </tr>
      </thead>
      <tbody>
        @for (user of users; track user._id) {
          <tr>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.message }}</td>
            <td>{{ user.createdAt | date:'medium' }}</td>
          </tr>
        }
      </tbody>
    </table>
  }
</div>
```

---

#### 4.4 – Simple CSS

Open file:  
`src/app/user-form/user-form.css`

```css
.container {
  max-width: 600px;
  margin: 40px auto;
  font-family: Arial, sans-serif;
}

input, textarea {
  width: 100%;
  padding: 10px;
  margin: 6px 0 15px;
  box-sizing: border-box;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  margin-right: 10px;
}

.error {
  color: red;
  font-size: 13px;
  margin-top: -10px;
  margin-bottom: 10px;
}

.success {
  color: green;
  font-weight: bold;
}

table {
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
}
```

---

#### 4.5 – App Component

Open file:  
`src/app/app.ts`

Replace everything with this:

```ts
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
```

---

#### 4.6 – App Config (Important)

Open file:  
`src/app/app.config.ts`

Replace everything with this:

```ts
import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideHttpClient() // imp...
  ]
};
```

---

### Step 5: Run the Angular App

In the Angular project folder run:

```powershell
ng serve --open
```

---

### Final Result

- Form will open in browser
- Fill Name, Email, Message → Click Submit
- Data will be saved in MongoDB
- Table below will show the data automatically
- Click “Refresh” anytime to fetch again

---

You now have a **complete working** Angular form that:
1. Sends data to database  
2. Fetches data again from database  

