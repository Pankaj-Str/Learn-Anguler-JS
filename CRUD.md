# Angular CLI CRUD Operations

## 1. What is CRUD?

CRUD represents the four basic operations used in most web applications.

C — Create

Add a new student to the application.

R — Read

Display all students in a table.

U — Update

Edit an existing student's details.

D — Delete

Remove a student from the list.

Technology used

- Angular CLI
- TypeScript
- HTML and CSS
- Angular Forms
- Browser memory for storing student records during this first tutorial

Note: This beginner version will not use a database yet. Records will reset when the application is refreshed. We can connect a backend and database in the next step.

## 2. Install the required software

### Step 1: Install Node.js

Angular CLI requires Node.js and npm.

Download Node.js from the official website:

[Download Node.js](https://nodejs.org/)

Choose an LTS version compatible with the Angular version you intend to install.

### Step 2: Verify the installation

Open your terminal or VS Code terminal and execute these commands:

```
node -v
npm -v
```

Example output (your version numbers may differ):

```
v22.x.x
10.x.x
```

If both commands display version numbers, you are ready to continue.

### Step 3: Install Angular CLI

Run:

```
npm install -g @angular/cli
```

Verify it:

```
ng version
```

`ng` is the Angular CLI command used to create, run, and manage Angular applications.

## 3. Create a new Angular project

Open your terminal and run the following commands one by one.

Step 1 — Create the project

```
ng new student-crud --standalone --routing=false --style=css
```

If Angular asks additional setup questions, choose the default options suitable for a basic application.

Step 2 — Open the project folder

```
cd student-crud
```

Step 3 — Open the project in VS Code

```
code .
```

If `code .` does not work, open VS Code manually and select File → Open Folder → student-crud.

Step 4 — Run the application

```
ng serve --open
```

Your browser should open at:

[http://localhost:4200/](http://localhost:4200/)

Angular CLI creates the application workspace and runs a development server using these commands.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://angular.dev\&sz=32)

Angular

+1



## 4. Understand the project structure

Your project will contain files similar to these:

```
student-crud/
│
├── src/
│   ├── app/
│   │   ├── app.ts
│   │   ├── app.html
│   │   ├── app.css
│   │   └── app.config.ts
│   │
│   ├── index.html
│   └── main.ts
│
├── angular.json
├── package.json
└── tsconfig.json
```

Depending on the Angular version, the component files might instead be named `app.component.ts`, `app.component.html`, and `app.component.css`.

We will modify the main component's TypeScript, HTML, and CSS files.

## 5. Import FormsModule

Angular needs `FormsModule` for two-way data binding with `[(ngModel)]`.

Open your main component TypeScript file, usually `src/app/app.ts`.

Replace its contents with the following code.

File: `src/app/app.ts`

```
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'Student Management System';
}
```

If your generated component is named `app.component.ts`, use the same code in that file but change the template and stylesheet paths to match your filenames.

What does this code do?

- `Component` defines an Angular component.
- `FormsModule` enables template-driven form features.
- `selector` identifies the component's HTML element.
- `templateUrl` connects the HTML file.
- `styleUrl` connects the CSS file.
- `App` is the TypeScript class controlling the page.

## 6. Create the student form and table

Open `src/app/app.html` and replace its contents.

File: `src/app/app.html`

```
<div class="container">

  <h1>{{ title }}</h1>

  <h2>Add Student</h2>

  <form>
    <input
      type="text"
      name="name"
      placeholder="Enter student name"
      [(ngModel)]="studentName"
    />

    <input
      type="email"
      name="email"
      placeholder="Enter student email"
      [(ngModel)]="studentEmail"
    />

    <button type="button" (click)="addStudent()">
      Add Student
    </button>
  </form>

  <h2>Student List</h2>

  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Actions</th>
      </tr>
    </thead>

    <tbody>
      @for (student of students; track student.id) {
        <tr>
          <td>{{ student.id }}</td>
          <td>{{ student.name }}</td>
          <td>{{ student.email }}</td>
          <td>
            <button type="button"
              (click)="editStudent(student)">
              Edit
            </button>

            <button type="button"
              (click)="deleteStudent(student.id)">
              Delete
            </button>
          </td>
        </tr>
      } @empty {
        <tr>
          <td colspan="4">No students available.</td>
        </tr>
      }
    </tbody>
  </table>

</div>
```

This HTML provides:

- Input fields for student name and email.
- An Add Student button.
- A table to display student records.
- Edit and Delete buttons for every student.

The `@for` syntax is Angular's built-in template control flow for displaying a collection of records.

## 7. Implement Create, Read, Update and Delete

Now replace the contents of `src/app/app.ts` with the complete code below.

File: `src/app/app.ts`

```

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Student {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  title = 'Student Management System';

  students: Student[] = [];

  studentName = '';
  studentEmail = '';

  editingId: number | null = null;
  nextId = 1;

  // CREATE and UPDATE
  addStudent(): void {
    const name = this.studentName.trim();
    const email = this.studentEmail.trim();

    if (!name || !email) {
      alert('Please enter student name and email.');
      return;
    }

    if (this.editingId !== null) {
      // UPDATE existing student
      this.students = this.students.map(student =>
        student.id === this.editingId
          ? { ...student, name, email }
          : student
      );

      alert('Student updated successfully!');
    } else {
      // CREATE new student
      const newStudent: Student = {
        id: this.nextId++,
        name: name,
        email: email
      };

      this.students = [...this.students, newStudent];

      alert('Student added successfully!');
    }

    this.resetForm();
  }

  // READ
  // The students array is displayed in the HTML table.

  // Load a student into the form for editing
  editStudent(student: Student): void {
    this.editingId = student.id;
    this.studentName = student.name;
    this.studentEmail = student.email;
  }

  // DELETE
  deleteStudent(id: number): void {
    const confirmed = confirm(
      'Are you sure you want to delete this student?'
    );

    if (!confirmed) {
      return;
    }

    this.students = this.students.filter(
      student => student.id !== id
    );

    if (this.editingId === id) {
      this.resetForm();
    }

    alert('Student deleted successfully!');
  }

  // Reset the form
  resetForm(): void {
    this.studentName = '';
    this.studentEmail = '';
    this.editingId = null;
  }
}

```

### Understand the important methods

| Method            | Purpose                                 |
| ----------------- | --------------------------------------- |
| `addStudent()`    | Adds a new record or saves edits        |
| `editStudent()`   | Loads the selected record into the form |
| `deleteStudent()` | Removes the selected record             |
| `resetForm()`     | Clears inputs and exits edit mode       |

The `Student` interface defines the structure of each student record. The `students` array stores the records while the application is running.

## 8. Update the HTML for the Edit and Update workflow

In `src/app/app.html`, replace the existing form section with this updated version:

```
<h2>
  {{ editingId === null ? 'Add Student' : 'Update Student' }}
</h2>

<form>
  <input
    type="text"
    name="name"
    placeholder="Enter student name"
    [(ngModel)]="studentName"
  />

  <input
    type="email"
    name="email"
    placeholder="Enter student email"
    [(ngModel)]="studentEmail"
  />

  <button type="button" (click)="addStudent()">
    {{ editingId === null ? 'Add Student' : 'Update Student' }}
  </button>

  @if (editingId !== null) {
    <button type="button" (click)="resetForm()">
      Cancel
    </button>
  }
</form>
```

Now, when you click Edit, the form fills with the selected student's details. The button changes to Update Student. When you save, the existing record is updated instead of creating a duplicate.

## 9. Add professional CSS styling

Open `src/app/app.css` and add the following complete styling.

```

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #f3f6fb;
  color: #1f2937;
}

.container {
  max-width: 1000px;
  margin: 40px auto;
  padding: 30px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

h1 {
  text-align: center;
  color: #1d4ed8;
  margin-bottom: 35px;
}

h2 {
  margin-top: 25px;
}

form {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 30px;
}

input {
  flex: 1;
  min-width: 200px;
  padding: 12px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 15px;
}

button {
  padding: 11px 16px;
  border: none;
  border-radius: 6px;
  background: #2563eb;
  color: white;
  cursor: pointer;
  font-size: 14px;
}

button:hover {
  background: #1d4ed8;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
}

th, td {
  padding: 14px;
  border: 1px solid #e2e8f0;
  text-align: left;
}

th {
  background: #eff6ff;
  color: #1e40af;
}

tr:nth-child(even) {
  background: #f8fafc;
}

td button {
  margin: 3px;
}

@media (max-width: 600px) {
  .container {
    margin: 10px;
    padding: 15px;
    overflow-x: auto;
  }

  table {
    min-width: 600px;
  }
}

```

## 10. Run and test the complete application

In your terminal, run:

```
ng serve --open
```

If the development server is already running, save your files and Angular should rebuild the application automatically.

## Expected application workflow

### Student Management System

Add Student

Student name: Rahul Sharma

Email: rahul\@example.com

Add Student

### Student List

| ID | Name         | Email              |
| -- | ------------ | ------------------ |
| 1  | Rahul Sharma | rahul\@example.com |

Illustrative example of the expected interface.

Test each operation:

1. Create: Enter a name and email, then click Add Student.
2. Read: Verify the new record appears in the table.
3. Update: Click Edit, change the name, and click Update Student.
4. Delete: Click Delete and confirm the deletion.
5. Validation: Try adding a student with empty fields.

## 11. Important limitation: data persistence

This application currently stores records in a TypeScript array. It demonstrates CRUD functionality, but the records are not saved permanently.

For a real application, the next step is to connect Angular to a backend API and database.

A typical architecture is:

Angular Frontend

Forms, table and CRUD buttons

Backend REST API

Node.js / Express or Spring Boot

Database

MySQL or MongoDB

Suggested next lesson: Connect this Angular CRUD application to a MySQL database using Node.js and Express, including complete backend code, API calls, and permanent storage.
