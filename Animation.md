### Animations in an Angular project using Angular CLI, you can use the Angular animations module. Here's a step-by-step guide on how to add basic animations to your Angular application:

### Step 1: Create an Angular Project
First, make sure you have Angular CLI installed. If not, install it using the following command:
```bash
npm install -g @angular/cli
```

Then, create a new Angular project:
```bash
ng new angular-animation-example
cd angular-animation-example
```

### Step 2: Install Angular Animations Module
Angular provides built-in animation support through the `@angular/animations` package. It should already be installed by default, but if it's not, you can install it using:
```bash
npm install @angular/animations
```

### Step 3: Import Animation Module
Open the `app.module.ts` file and import the `BrowserAnimationsModule` from `@angular/platform-browser/animations`. Then, add it to the `imports` array of your `@NgModule` decorator:

```typescript
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

### Step 4: Define Animations in the Component
Next, you can define animations in your component. Open the `app.component.ts` file, and import the necessary animation functions:
```typescript
import { trigger, transition, style, animate } from '@angular/animations';
```

Then, in your `@Component` decorator, define the animations. Here's an example of a simple fade-in animation:

```typescript
import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class AppComponent {
  title = 'angular-animation-example';
}
```

### Step 5: Apply Animation to HTML
Now, apply the animation in the HTML template. In your `app.component.html`, use the `[@fadeIn]` directive to bind the animation to an element.

```html
<div *ngIf="showElement" [@fadeIn]>
  <h1>Welcome to Angular Animations!</h1>
</div>

<button (click)="toggleElement()">Toggle Element</button>
```

### Step 6: Add Logic to Toggle Animation
In the `app.component.ts` file, add the logic to toggle the visibility of the element and trigger the animation when the button is clicked:

```typescript
export class AppComponent {
  title = 'angular-animation-example';
  showElement = true;

  toggleElement() {
    this.showElement = !this.showElement;
  }
}
```

### Step 7: Run the Application
Finally, run your Angular application to see the animation in action:
```bash
ng serve
```
Visit `http://localhost:4200/` in your browser. You should see the "Welcome to Angular Animations!" message appear with a fade-in effect when the page loads. Clicking the "Toggle Element" button will toggle the visibility of the message with an animation.

### Additional Animations
Angular provides many built-in animation features like:
- `keyframes()`: To define animations over time.
- `state()`: To define different states for an element.
- `group()`: To run multiple animations in parallel.

For more complex animations, you can chain and combine these features.
