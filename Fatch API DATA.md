# complete Angular CLI project

We will use the free API:

`https://jsonplaceholder.typicode.com/users`

## 1. Create Angular Project

Open CMD / Terminal:

```bash
npm install -g @angular/cli
```

Create project:

```bash
ng new api-demo
```

Choose:

```text
Would you like to add Angular routing? No
Which stylesheet format? CSS
```

Go inside:

```bash
cd api-demo
```

Run the project:

```bash
ng serve
```

Open:

```text
http://localhost:4200
```

---

# 2. Project Structure

We will use these files:

```text
api-demo
│
└── src
    └── app
        ├── app.ts
        ├── app.html
        └── app.css
```

---

# 3. Create TypeScript Code

Open:

```text
src/app/app.ts
```

Replace everything with:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  users: any[] = [];

  async getUsers() {

    const response = await fetch(
      'https://jsonplaceholder.typicode.com/users'
    );

    this.users = await response.json();

  }

}
```

Here we created:

```typescript
users: any[] = [];
```

This will store our API data.

---

# 4. Create HTML Page

Now open:

```text
src/app/app.html
```

Replace everything with:

```html
<div class="container">

  <h1>Users List</h1>

  <button (click)="getUsers()">
    Get Users
  </button>

  <div class="users">

    <div class="user-card" *ngFor="let user of users">

      <h2>{{ user.name }}</h2>

      <p>
        <strong>Username:</strong>
        {{ user.username }}
      </p>

      <p>
        <strong>Email:</strong>
        {{ user.email }}
      </p>

      <p>
        <strong>Phone:</strong>
        {{ user.phone }}
      </p>

      <p>
        <strong>Website:</strong>
        {{ user.website }}
      </p>

    </div>

  </div>

</div>
```

### Important

This:

```html
{{ user.name }}
```

means:

> Show the `name` value from the API.

And:

```html
*ngFor="let user of users"
```

means:

> Repeat this HTML for every user.

---

# 5. Add CSS

Open:

```text
src/app/app.css
```

Add:

```css
.container {
  width: 80%;
  margin: 40px auto;
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
}

button {
  display: block;
  margin: 20px auto;
  padding: 12px 25px;
  font-size: 16px;
  cursor: pointer;
}

.users {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.user-card {
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 10px;
  background: #f8f8f8;
}

.user-card h2 {
  margin-top: 0;
}
```

---

# 6. One Important Thing — `*ngFor`

Because we are using:

```html
*ngFor
```

we need to import `CommonModule`.

Update `app.ts` like this:

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  users: any[] = [];

  async getUsers() {

    const response = await fetch(
      'https://jsonplaceholder.typicode.com/users'
    );

    this.users = await response.json();

  }

}
```

---

# 7. Complete `app.ts`

So your final `app.ts` is:

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  users: any[] = [];

  async getUsers() {

    const response = await fetch(
      'https://jsonplaceholder.typicode.com/users'
    );

    this.users = await response.json();

  }

}
```

---

# 8. Complete `app.html`

```html
<div class="container">

  <h1>Users List</h1>

  <button (click)="getUsers()">
    Get Users
  </button>

  <div class="users">

    <div class="user-card" *ngFor="let user of users">

      <h2>{{ user.name }}</h2>

      <p>
        <strong>Username:</strong>
        {{ user.username }}
      </p>

      <p>
        <strong>Email:</strong>
        {{ user.email }}
      </p>

      <p>
        <strong>Phone:</strong>
        {{ user.phone }}
      </p>

      <p>
        <strong>Website:</strong>
        {{ user.website }}
      </p>

    </div>

  </div>

</div>
```

---

# 9. How It Works

When you open the page:

```text
Users List

[ Get Users ]
```

Nothing is displayed yet because:

```typescript
users = [];
```

The array is empty.

When you click:

```text
Get Users
```

Angular runs:

```typescript
getUsers()
```

Then:

```typescript
fetch('https://jsonplaceholder.typicode.com/users')
```

calls the API.

The API sends data:

```json
[
  {
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz"
  },
  {
    "id": 2,
    "name": "Ervin Howell",
    "username": "Antonette",
    "email": "Shanna@melissa.tv"
  }
]
```

Then:

```typescript
this.users = await response.json();
```

stores the API data inside:

```text
users
```

Then Angular sees:

```html
*ngFor="let user of users"
```

and automatically creates HTML for every user.

---

# 10. Final Result

Your browser will show something like:

```text
                 Users List

                [ Get Users ]


┌────────────────────┐
│ Leanne Graham      │
│ Username: Bret     │
│ Email: ...         │
│ Phone: ...         │
│ Website: ...       │
└────────────────────┘

┌────────────────────┐
│ Ervin Howell       │
│ Username: Antonette│
│ Email: ...         │
│ Phone: ...         │
│ Website: ...       │
└────────────────────┘

┌────────────────────┐
│ Clementine Bauch   │
│ Username: Samantha │
│ Email: ...         │
│ Phone: ...         │
│ Website: ...       │
└────────────────────┘
```

## The complete flow

```text
                 Angular
                    │
                    ▼
             Click Get Users
                    │
                    ▼
                getUsers()
                    │
                    ▼
                  fetch()
                    │
                    ▼
       JSONPlaceholder API
                    │
                    ▼
              JSON Response
                    │
                    ▼
           response.json()
                    │
                    ▼
             this.users
                    │
                    ▼
                 *ngFor
                    │
                    ▼
              HTML Page
```

**In simple words:** `fetch()` API se data lata hai → `this.users` mein rakhta hai → `*ngFor` us data ko HTML mein repeat karke show karta hai.
