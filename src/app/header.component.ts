import { Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'cms-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  @Output() selectedFeatureEvent = new EventEmitter<string>();

    onSelected(selectedEvent: string){
    this.selectedFeatureEvent.emit(selectedEvent);
  }

  constructor() {
  }

  ngOnInit(){
}
}
