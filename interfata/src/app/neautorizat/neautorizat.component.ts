import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-neautorizat',
  templateUrl: './neautorizat.component.html',
  styleUrls: ['./neautorizat.component.css']
})
export class NeautorizatComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit(): void {
  }

  inapoi() {
    this.location.back();
  }

}
