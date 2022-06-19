import { Component, Input } from '@angular/core';
import { Location } from 'src/app/models/location.model';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent {

  @Input() location = {} as Location;

}
