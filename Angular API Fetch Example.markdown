# Fetching API Data into a List Using Angular CLI: Step-by-Step Example

This guide provides a step-by-step example of fetching data from a public API and displaying it as a list in an Angular application using Angular CLI. We will use the JSONPlaceholder API to retrieve a list of posts.

## Prerequisites

- Node.js and npm installed (version 16 or later recommended).
- Angular CLI installed globally (`npm install -g @angular/cli`).
- Basic knowledge of Angular and TypeScript.

## Step 1: Create a New Angular Project

1. Open a terminal and run the following command to create a new Angular project:

   ```bash
   ng new angular-api-fetch
   ```
2. When prompted, select the following options:
   - Enable routing: Yes
   - Stylesheet format: CSS
3. Navigate to the project directory:

   ```bash
   cd angular-api-fetch
   ```

## Step 2: Generate a Service for API Calls

1. Create a service to handle API requests using Angular CLI:

   ```bash
   ng generate service services/post
   ```
2. This generates `post.service.ts` in the `src/app/services` folder.

## Step 3: Configure HttpClientModule

1. Open `src/app/app.module.ts` and import `HttpClientModule` to enable HTTP requests:

   ```typescript
   import { NgModule } from '@angular/core';
   import { BrowserModule } from '@angular/platform-browser';
   import { HttpClientModule } from '@angular/common/http';
   import { AppRoutingModule } from './app-routing.module';
   import { AppComponent } from './app.component';
   
   @NgModule({
     declarations: [AppComponent],
     imports: [BrowserModule, AppRoutingModule, HttpClientModule],
     providers: [],
     bootstrap: [AppComponent]
   })
   export class AppModule {}
   ```

## Step 4: Define a Data Model

1. Create a TypeScript interface to define the structure of the API data. Run:

   ```bash
   ng generate interface models/post
   ```
2. Open `src/app/models/post.ts` and define the interface:

   ```typescript
   export interface Post {
     userId: number;
     id: number;
     title: string;
     body: string;
   }
   ```

## Step 5: Implement the Service

1. Open `src/app/services/post.service.ts` and update it to fetch posts from the JSONPlaceholder API:

   ```typescript
   import { Injectable } from '@angular/core';
   import { HttpClient } from '@angular/common/http';
   import { Observable } from 'rxjs';
   import { Post } from '../models/post';
   
   @Injectable({
     providedIn: 'root'
   })
   export class PostService {
     private apiUrl = 'https://jsonplaceholder.typicode.com/posts';
   
     constructor(private http: HttpClient) {}
   
     getPosts(): Observable<Post[]> {
       return this.http.get<Post[]>(this.apiUrl);
     }
   }
   ```

## Step 6: Update the Component

1. Open `src/app/app.component.ts` and modify it to fetch and store the posts:

   ```typescript
   import { Component, OnInit } from '@angular/core';
   import { PostService } from './services/post.service';
   import { Post } from './models/post';
   
   @Component({
     selector: 'app-root',
     templateUrl: './app.component.html',
     styleUrls: ['./app.component.css']
   })
   export class AppComponent implements OnInit {
     posts: Post[] = [];
     isLoading: boolean = true;
     error: string | null = null;
   
     constructor(private postService: PostService) {}
   
     ngOnInit(): void {
       this.postService.getPosts().subscribe({
         next: (data) => {
           this.posts = data;
           this.isLoading = false;
         },
         error: (err) => {
           this.error = 'Failed to fetch posts: ' + err.message;
           this.isLoading = false;
           console.error(err);
         }
       });
     }
   }
   ```

## Step 7: Create the Component Template

1. Open `src/app/app.component.html` and add HTML to display the posts as a list:

   ```html
   <div class="container">
     <h1>Posts from API</h1>
   
     <div *ngIf="isLoading" class="loading">Loading...</div>
     <div *ngIf="error" class="error">{{ error }}</div>
   
     <ul *ngIf="!isLoading && !error" class="post-list">
       <li *ngFor="let post of posts" class="post-item">
         <h3>{{ post.title }}</h3>
         <p>{{ post.body }}</p>
       </li>
     </ul>
   </div>
   ```

## Step 8: Style the Component

1. Open `src/app/app.component.css` and add basic styles for better presentation:

   ```css
   .container {
     max-width: 800px;
     margin: 0 auto;
     padding: 20px;
   }
   
   .loading {
     text-align: center;
     font-size: 1.2em;
     color: #666;
   }
   
   .error {
     color: red;
     text-align: center;
     font-size: 1.2em;
   }
   
   .post-list {
     list-style: none;
     padding: 0;
   }
   
   .post-item {
     border: 1px solid #ddd;
     padding: 15px;
     margin-bottom: 10px;
     border-radius: 5px;
   }
   
   .post-item h3 {
     margin: 0 0 10px;
     font-size: 1.3em;
   }
   
   .post-item p {
     margin: 0;
     color: #333;
   }
   ```

## Step 9: Run the Application

1. Start the development server:

   ```bash
   ng serve --open
   ```
2. The browser will open `http://localhost:4200`, displaying a list of posts fetched from the API. If there are issues, check the console for errors.

## Step 10: Verify the Output

- The application should display a loading indicator while fetching data.
- Upon successful retrieval, a list of posts with titles and bodies appears.
- If an error occurs (e.g., network failure), an error message is shown.

## Notes

- The JSONPlaceholder API (`https://jsonplaceholder.typicode.com/posts`) is a free, public API for testing. Replace it with your API endpoint as needed.
- The example uses `HttpClient` for HTTP requests, which is the recommended approach in Angular over the native Fetch API for better integration and scalability.
- The `async` pipe can be used instead of manual subscription to simplify the template and prevent memory leaks. For example:

  ```typescript
  // In app.component.ts
  posts$ = this.postService.getPosts();
  ```

  ```html
  <!-- In app.component.html -->
  <ul *ngIf="posts$ | async as posts">
    <li *ngFor="let post of posts">
      <h3>{{ post.title }}</h3>
      <p>{{ post.body }}</p>
    </li>
  </ul>
  ```
- Always handle errors and loading states to improve user experience.

This example provides a maintainable and type-safe approach to fetching and displaying API data in Angular. You can extend it by adding features like pagination or search functionality.