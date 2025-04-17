
# Angular CLI Form Example for Beginners

This tutorial guides you through creating a basic form using Angular CLI with reactive forms. We'll create a user registration form with name, email, and password fields.

## Prerequisites
- Node.js (v16 or later)
- npm (v8 or later)
- Angular CLI (install globally: `npm install -g @angular/cli`)

## Step-by-Step Instructions

### Step 1: Create a New Angular Project
1. Open your terminal/command prompt.
2. Run the following command to create a new project:
```bash
ng new angular-form-example
```
3. When prompted:
   - Choose `Yes` for Angular routing
   - Select `CSS` for stylesheet format
4. Navigate to the project directory:
```bash
cd angular-form-example
```

### Step 2: Generate a Form Component
1. Create a new component for the form:
```bash
ng generate component user-form
```
This creates a `user-form` component in `src/app/user-form/`.

### Step 3: Set Up Reactive Forms Module
1. Open `src/app/app.module.ts`
2. Add ReactiveFormsModule to the imports array:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserFormComponent } from './user-form/user-form.component';

@NgModule({
  declarations: [
    AppComponent,
    UserFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### Step 4: Create the Form in the Component
1. Open `src/app/user-form/user-form.component.ts`
2. Update it with the following code:

```typescript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    this.submitted = true;
    if (this.userForm.valid) {
      console.log('Form Submitted!', this.userForm.value);
    }
  }

  // Getter for form controls
  get f() { return this.userForm.controls; }
}
```

### Step 5: Create the Form Template
1. Open `src/app/user-form/user-form.component.html`
2. Add the following code:

```html
<div class="form-container">
  <h2>User Registration Form</h2>
  <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
    <!-- Name Field -->
    <div class="form-group">
      <label for="name">Name</label>
      <input 
        type="text" 
        id="name" 
        formControlName="name" 
        class="form-control"
        [ngClass]="{'is-invalid': submitted && f.name.errors}"
      >
      <div *ngIf="submitted && f.name.errors" class="invalid-feedback">
        <div *ngIf="f.name.errors.required">Name is required</div>
        <div *ngIf="f.name.errors.minlength">Name must be at least 3 characters</div>
      </div>
    </div>

    <!-- Email Field -->
    <div class="form-group">
      <label for="email">Email</label>
      <input 
        type="email" 
        id="email" 
        formControlName="email" 
        class="form-control"
        [ngClass]="{'is-invalid': submitted && f.email.errors}"
      >
      <div *ngIf="submitted && f.email.errors" class="invalid-feedback">
        <div *ngIf="f.email.errors.required">Email is required</div>
        <div *ngIf="f.email.errors.email">Email must be a valid email address</div>
      </div>
    </div>

    <!-- Password Field -->
    <div class="form-group">
      <label for="password">Password</label>
      <input 
        type="password" 
        id="password" 
        formControlName="password" 
        class="form-control"
        [ngClass]="{'is-invalid': submitted && f.password.errors}"
      >
      <div *ngIf="submitted && f.password.errors" class="invalid-feedback">
        <div *ngIf="f.password.errors.required">Password is required</div>
        <div *ngIf="f.password.errors.minlength">Password must be at least 6 characters</div>
      </div>
    </div>

    <!-- Submit Button -->
    <button type="submit" class="btn btn-primary">Register</button>
  </form>
</div>
```

### Step 6: Add Basic Styling
1. Open `src/app/user-form/user-form.component.css`
2. Add the following CSS:

```css
.form-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-control {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-control.is-invalid {
  border-color: #dc3545;
}

.invalid-feedback {
  color: #dc3545;
  font-size: 0.875em;
}

.btn-primary {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #0056b3;
}
```

### Step 7: Include Bootstrap (Optional for Better Styling)
1. Open `angular.json`
2. Add Bootstrap CSS to the styles array:
```json
"styles": [
  "node_modules/bootstrap/dist/css/bootstrap.min.css",
  "src/styles.css"
]
```
3. Install Bootstrap:
```bash
npm install bootstrap
```

### Step 8: Update App Component
1. Open `src/app/app.component.html`
2. Replace the content with:
```html
<app-user-form></app-user-form>
```

### Step 9: Run the Application
1. Start the development server:
```bash
ng serve
```
2. Open your browser and navigate to `http://localhost:4200`

## How It Works
- The form uses Angular's **Reactive Forms** for better control and validation
- Form fields include:
  - Name (required, minimum 3 characters)
  - Email (required, must be valid email format)
  - Password (required, minimum 6 characters)
- Validation errors appear when:
  - Fields are empty
  - Input doesn't meet requirements
  - User submits the form
- On successful submission, form data is logged to the console

## Testing the Form
1. Try submitting without filling fields (should show validation errors)
2. Enter invalid email format (should show email error)
3. Enter valid data and submit (check console for output)


