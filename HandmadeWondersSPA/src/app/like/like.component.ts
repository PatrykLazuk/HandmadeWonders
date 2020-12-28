import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
export class LikeComponent implements OnInit {

  @Input('isFavorite') isFavorite: boolean;

  @Output('change') change = new EventEmitter<FavEventArgs>();

  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    this.isFavorite = !this.isFavorite;
    this.change.emit({ status: this.isFavorite });
  }
}

export interface FavEventArgs {
  status: boolean
}
