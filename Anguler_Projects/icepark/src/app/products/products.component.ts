import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent{

  cards = [
    { id: 1, title: 'Card 1', description: 'This is the first card.', image: 'https://png.pngtree.com/png-vector/20240604/ourmid/pngtree-cartoon-mammoth-ice-age-extinct-animal-character-png-image_12619369.png' },
    { id: 2, title: 'Card 2', description: 'This is the second card.', image: 'https://png.pngtree.com/png-clipart/20240627/original/pngtree-ice-age-giants-the-fascinating-woolly-mammoth-png-image_15424421.png' },
    { id: 3, title: 'Card 3', description: 'This is the third card.', image: 'https://freedesignfile.com/image/preview/7884/ice-age-diego-clipart.png' }
  ];

  

  info(){
    alert("welcome")
  }
}
