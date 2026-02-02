import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
@Component({
  selector: 'app-card',
  imports: [NgFor, MatButtonModule, MatCardModule, MatGridListModule],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  cards = [
    { id: 1, title: 'Card 1', description: 'This is the first card.', image: 'https://via.placeholder.com/150' },
    { id: 2, title: 'Card 2', description: 'This is the second card.', image: 'https://via.placeholder.com/150' },
    { id: 3, title: 'Card 3', description: 'This is the third card.', image: 'https://via.placeholder.com/150' }
  ];

  data= [
    {
      title: "Web Development",
      t_name: "Megha",
      t_con:"The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser. It can be assisted by technologies such as Cascading Style Sheets and scripting languages such as JavaScript."
    },
    {
      title: "App Development",
      t_name: "Suraj",
      t_con:"Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch."
    },
    { title: "IOS Development",
      t_name: "Joy",
      t_con:"Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS."
    },
  ]
    
}
