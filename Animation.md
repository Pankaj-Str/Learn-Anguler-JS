# Angular Animation 

## Step 1: Create an Angular Project

Open your terminal and run:

```
ng new angular-animation-demo
cd angular-animation-demo
ng serve
```

Open `http://localhost:4200/` in your browser.

## Step 2: Install Angular Animations

For Angular versions that use the traditional animation system, install the animations package:

```
npm install @angular/animations
```

## Step 3: Configure Animations

If your project uses `app.module.ts`, import `BrowserAnimationsModule`:

```
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    BrowserAnimationsModule
  ]
})
export class AppModule {}
```

If you are using a standalone Angular application, configure animations in `app.config.ts` instead:

```
import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations()
  ]
};
```

## Step 4: Create the Animation Component

Open `app.component.ts` and add the following code:

```

import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [
    trigger('boxAnimation', [
      state('normal', style({
        opacity: 1,
        transform: 'translateX(0) scale(1)'
      })),

      state('active', style({
        opacity: 1,
        transform: 'translateX(100px) scale(1.2)'
      })),

      transition('normal <=> active', [
        animate('600ms ease-in-out')
      ])
    ])
  ]
})
export class AppComponent {
  animationState = 'normal';

  toggleAnimation() {
    this.animationState =
      this.animationState === 'normal'
        ? 'active'
        : 'normal';
  }
}

```

How it works:

- `trigger()` defines an animation.
- `state()` defines the appearance of each state.
- `style()` specifies CSS styles.
- `transition()` defines how the animation changes between states.
- `animate()` controls the duration and timing.

## Step 5: Create the HTML Template

Open `app.component.html`:

```

<h1>Angular Animation Demo</h1>

<div
  class="box"
  [@boxAnimation]="animationState">
  Angular
</div>

<button (click)="toggleAnimation()">
  Toggle Animation
</button>

```

## Step 6: Add CSS Styling

Open `app.component.css`:

```

h1 {
  font-family: Arial, sans-serif;
  color: #2563eb;
}

.box {
  width: 150px;
  height: 150px;
  margin: 40px 0;
  background: #2563eb;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  font-size: 24px;
  font-weight: bold;
}

button {
  padding: 12px 24px;
  background: #16a34a;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
}

```

## Step 7: Run the Application

```
ng serve
```

Click the Toggle Animation button.

Expected animation behavior

Angular

Click to preview the two animation states.

NormalActive

Normal: original position and size. Active: the box moves right and grows by 20%.

## Step 8: Other Angular Animation Examples

| Animation          | Purpose                                     |
| ------------------ | ------------------------------------------- |
| Fade In / Fade Out | Show or hide elements smoothly              |
| Slide Animation    | Move elements horizontally or vertically    |
| Zoom Animation     | Enlarge or shrink elements                  |
| Rotation           | Rotate an element                           |
| List Animation     | Animate items as they enter or leave a list |
| Route Animation    | Animate transitions between pages           |

