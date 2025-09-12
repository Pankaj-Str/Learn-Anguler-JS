import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-center-section',
  templateUrl: './center-section.component.html',
  styleUrls: ['./center-section.component.css']
})
export class CenterSectionComponent implements OnInit {

   title = "Welcome to ICE Park";

  constructor() { }

  ngOnInit(): void {
  }

}
