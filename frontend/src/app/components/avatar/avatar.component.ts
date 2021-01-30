import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {

  displayName: any = '';
  initials: string = '';
  circleColor: string = '';
  private colors = [
    'red',
    'green',
    'yellow',
    'blue'
  ];

  constructor() {
    if(typeof localStorage.getItem('displayName') !== undefined && localStorage.getItem('displayName') !== null) {
      this.displayName = localStorage.getItem('displayName');
    }
  }
  
  ngOnInit(): void {
    const randomIndex = Math.floor(Math.random() * Math.floor(this.colors.length));
    this.circleColor = this.colors[randomIndex];
    this.createInitials();
  }

  private createInitials() {
    let initials = '';

    for(let i=0; i<this.displayName.length; i++) {
      if(this.displayName.charAt(i)===' ') {
        continue;
      }

      if(this.displayName.charAt(i) === this.displayName.charAt(i).toUpperCase()) {
        initials += this.displayName.charAt(i);
        if(initials.length === 2) {
          break;
        }
      }
    }
    this.initials = initials;
  }

}
