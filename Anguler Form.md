# Angular: Send Form Data from One Page to Another



## Example

### Page 1 → Registration Form

The form will contain:

* Name
* Email
* Mobile

After clicking **Submit**, we will navigate to:

### Page 2 → User Details

The submitted form data will be displayed on the second page.

---

## Step 1: Create Components

Run these commands:

```bash
ng generate component registration
ng generate component user-details
```

Then configure the routes:

```typescript
import { Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { UserDetailsComponent } from './user-details/user-details.component';

export const routes: Routes = [
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: 'user-details',
    component: UserDetailsComponent
  }
];
```

---

## Step 2: Create the Registration Form

In `registration.component.html`:

```html
<h2>Registration Form</h2>

<form [formGroup]="registrationForm" (ngSubmit)="submitForm()">

  <label>Name</label>
  <input type="text" formControlName="name">

  <br><br>

  <label>Email</label>
  <input type="email" formControlName="email">

  <br><br>

  <label>Mobile</label>
  <input type="text" formControlName="mobile">

  <br><br>

  <button type="submit">
    Submit
  </button>

</form>
```

---

## Step 3: Create the FormGroup

In `registration.component.ts`:

```typescript
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registration.component.html'
})
export class RegistrationComponent {

  registrationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {

    this.registrationForm = this.fb.group({
      name: [''],
      email: [''],
      mobile: ['']
    });

  }

  submitForm() {

    const formData = this.registrationForm.value;

    console.log(formData);

    this.router.navigate(
      ['/user-details'],
      {
        state: {
          user: formData
        }
      }
    );
  }
}
```

The important part is:

```typescript
this.router.navigate(
  ['/user-details'],
  {
    state: {
      user: formData
    }
  }
);
```

This sends the `formData` to the next page.

---

## Step 4: Receive the Data on the Second Page

In `user-details.component.ts`:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-details',
  standalone: true,
  templateUrl: './user-details.component.html'
})
export class UserDetailsComponent {

  userData: any;

  constructor() {

    this.userData = history.state.user;

    console.log(this.userData);

  }
}
```

---

## Step 5: Display the Data

In `user-details.component.html`:

```html
<h2>User Details</h2>

<p>
  <strong>Name:</strong>
  {{ userData?.name }}
</p>

<p>
  <strong>Email:</strong>
  {{ userData?.email }}
</p>

<p>
  <strong>Mobile:</strong>
  {{ userData?.mobile }}
</p>
```

---

## Complete Flow

```text
Registration Page
       |
       ↓
User fills the form
       |
       ↓
Click Submit
       |
       ↓
registrationForm.value
       |
       ↓
Router Navigation
       |
       ↓
User Details Page
       |
       ↓
history.state.user
       |
       ↓
Display Data
```

### Example

If the user enters:

```text
Name   : Pankaj
Email  : pankaj@gmail.com
Mobile : 9876543210
```

After clicking **Submit**, the User Details page will display:

```text
User Details

Name   : Pankaj
Email  : pankaj@gmail.com
Mobile : 9876543210
```

## Important Note

`NavigationExtras.state` is useful when you want to pass data to another page **without displaying the data in the URL**.

If you want the data to appear in the URL, for example:

```text
/user-details?name=Pankaj&email=pankaj@gmail.com
```

then you should use **Query Parameters** instead.

For a multi-step application, such as:

```text
Form Page → Page 2 → Page 3 → Final API Submission
```


