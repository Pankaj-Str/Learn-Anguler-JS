### Card component in Angular using Angular CLI, fetching data from an array step-by-step.

### Prerequisites
- Node.js and npm installed.
- Angular CLI installed globally (`npm install -g @angular/cli`).

### Step-by-Step Guide

#### 1. **Set Up Angular Project**
If you don’t have a project, create one:
```bash
ng new card-demo
cd card-demo
```
Choose default settings (CSS, no routing for simplicity).

#### 2. **Generate a Card Component**
Create a card component to display data:
```bash
ng generate component card
```
This creates `src/app/card` with necessary files (`card.component.ts`, `.html`, `.css`, `.spec.ts`).

#### 3. **Define the Data Array**
In `src/app/card/card.component.ts`, define an array to hold card data:
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  // Sample array of card data
  cards = [
    { id: 1, title: 'Card 1', description: 'This is the first card.', image: 'https://via.placeholder.com/150' },
    { id: 2, title: 'Card 2', description: 'This is the second card.', image: 'https://via.placeholder.com/150' },
    { id: 3, title: 'Card 3', description: 'This is the third card.', image: 'https://via.placeholder.com/150' }
  ];
}
```

#### 4. **Create the Card Template**
Edit `src/app/card/card.component.html` to display cards using `*ngFor`:
```html
<div class="card-container">
  <div class="card" *ngFor="let card of cards">
    <img [src]="card.image" alt="{{ card.title }}" />
    <h2>{{ card.title }}</h2>
    <p>{{ card.description }}</p>
  </div>
</div>
```

#### 5. **Style the Card**
Add styles in `src/app/card/card.component.css`:
```css
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 20px;
}

.card {
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 200px;
  padding: 15px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card img {
  max-width: 100%;
  border-radius: 8px;
}

.card h2 {
  font-size: 1.5em;
  margin: 10px 0;
}

.card p {
  font-size: 1em;
  color: #555;
}
```

#### 6. **Include Card Component in App**
Ensure the card component is used in the main app. Edit `src/app/app.component.html`:
```html
<app-card></app-card>
```

#### 7. **Run the Application**
Start the development server:
```bash
ng serve
```
Open `http://localhost:4200` in your browser. You should see three cards displaying data from the array.

#### 8. **Optional: Fetch Data Dynamically (Simulate API)**
To simulate fetching data (e.g., from an API), modify `card.component.ts` to use a service.

**Generate a Service**:
```bash
ng generate service card
```

Edit `src/app/card.service.ts`:
```typescript
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  getCards(): Observable<any[]> {
    // Simulate API response
    return of([
      { id: 1, title: 'Card 1', description: 'This is the first card.', image: 'https://via.placeholder.com/150' },
      { id: 2, title: 'Card 2', description: 'This is the second card.', image: 'https://via.placeholder.com/150' },
      { id: 3, title: 'Card 3', description: 'This is the third card.', image: 'https://via.placeholder.com/150' }
    ]);
  }
}
```

Update `src/app/card/card.component.ts`:
```typescript
import { Component, OnInit } from '@angular/core';
import { CardService } from '../card.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  cards: any[] = [];

  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    this.cardService.getCards().subscribe(data => {
      this.cards = data;
    });
  }
}
```

#### 9. **Test the App**
Run `ng serve` again and verify that the cards load with the fetched data.

### Notes
- The array is hardcoded for simplicity. In a real app, replace `CardService`’s `of` with an HTTP call using `HttpClient` to fetch data from an API.
- Add error handling in the service for robustness.
- Use Angular’s `async` pipe in the template if you prefer working directly with Observables.

