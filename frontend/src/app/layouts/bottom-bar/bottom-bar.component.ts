import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bottom-bar',
  templateUrl: './bottom-bar.component.html',
  styleUrls: ['./bottom-bar.component.scss']
})
export class BottomBarComponent implements OnInit {

  @Input() iconList: Array<any> = []; 
  @ViewChild('shareIcon') shareIcon: ElementRef;
  @ViewChild('messageIcon') messageIcon: ElementRef;
  @ViewChild('profileIcon') profileIcon: ElementRef;
  user: string | null = '';

  constructor(
    private _router: Router,
  ) { 
    this.shareIcon = new ElementRef('shareIcon');
    this.messageIcon = new ElementRef('messageIcon');
    this.profileIcon = new ElementRef('profileIcon');
  }

  ngOnInit(): void {
    this.user = localStorage.getItem('encyptduser');
    this.iconList = [
      { icon: 'share1', routes: '/secret-message/create', class: 'active'},
      { icon: 'message', routes: '/share-message', class: 'active'},
      { icon: 'account_profile', routes: '/share-message', class: 'active'},
    ];
  }

  onRoutes(array: Array<string>) {
    this._router.navigate(array);
  }

  onShareLink() {
    this._router.navigate(['/secret-message/share-link', this.user]);
    this.shareIcon.nativeElement.classList.add('active');
    this.profileIcon.nativeElement.classList.remove('active');
    this.messageIcon.nativeElement.classList.remove('active');
  }

  onMessage() {
    this._router.navigate(['/secret-message/messages', this.user]);
    this.messageIcon.nativeElement.classList.add('active');
    this.profileIcon.nativeElement.classList.remove('active');
    this.shareIcon.nativeElement.classList.remove('active');
  
  }

  onProfile() {
    this._router.navigate(['/secret-message/view-profile']);
    this.profileIcon.nativeElement.classList.add('active');
    this.shareIcon.nativeElement.classList.remove('active');
    this.messageIcon.nativeElement.classList.remove('active');
  }
}
