import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  @Output() onPageView: any = new EventEmitter<any>();

}
