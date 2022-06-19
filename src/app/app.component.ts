import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Rick And Morty App';

  show: "characters" | "locations" = "characters";

  setShow(newValue: "characters" | "locations") {
    this.show = newValue;
  }
}
