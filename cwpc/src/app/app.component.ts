import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { CenterSectionComponent } from "./center-section/center-section.component";
import { ApidataComponent } from "./apidata/apidata.component";
import { DataComponent } from "./data/data.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, CenterSectionComponent, ApidataComponent, DataComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'cwpc';
}
