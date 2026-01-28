import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from "./home/home";
import { Card } from "./card/card";
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [Home, Card],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('food_point');
}
