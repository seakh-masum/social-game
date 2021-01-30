import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-type',
  templateUrl: './user-type.component.html',
  styleUrls: ['./user-type.component.scss']
})
export class UserTypeComponent implements OnInit {

  @Input() selectedValue:string = '';
  @Input() isLoggedIn:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
