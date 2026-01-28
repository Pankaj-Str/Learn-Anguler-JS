import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-card',
  imports: [NgFor],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  cards = [
    { id: 1, title: 'Card 1', description: 'This is the first card.', image: 'https://via.placeholder.com/150' },
    { id: 2, title: 'Card 2', description: 'This is the second card.', image: 'https://via.placeholder.com/150' },
    { id: 3, title: 'Card 3', description: 'This is the third card.', image: 'https://via.placeholder.com/150' }
  ];
}
