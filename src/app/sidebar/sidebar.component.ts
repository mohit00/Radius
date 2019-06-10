import { Component, OnInit ,HostBinding} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    HeaderTitle:String;
    child:any
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'DASHBOARD',  icon: 'fa fa-th', class: '' ,HeaderTitle:'DASHBOARD', child:[ ] },
    { path: '/user', title: 'PROTOTYPE',  icon:'fa-files-o', class: 'text-black', HeaderTitle:'DASHBOARD', child:[ {
      path: '/Attribute/Template', title: 'ATTRIBUTE PROTOTYPE',  icon:'fa fa-wrench',HeaderTitle:'ATTRIBUTE PROTOTYPE'
    },{
      path: '/Event/Template', title: 'EVENT PROTOTYPE',  icon:'fa fa-calendar',HeaderTitle:'EVENT TEMPLATE'
    },{
      path: '/Event/ACK/Template', title: 'EVENT ACK PROTOTYPE',  icon:'fa fa-file-text',HeaderTitle:'EVENT ACK TEMPLATE'
    },{
      path: '/Command/Template', title: 'COMMAND PROTOTYPE',  icon:'fa fa-terminal',HeaderTitle:'COMMAND PROTOTYPE'
    },{
      path: '/Command/ACK/Template', title: 'COMMAND ACK PROTOTYPE',  icon:'fa fa-check',HeaderTitle:'COMMAND ACK PROTOTYPE'
    },{
      path: '/Device/Template', title: 'THINGS PROTOTYPE',  icon:'fa fa-th',HeaderTitle:'THINGS TEMPLATE'
    }] },
    { path: '/Device/Provisioning', title: 'THINGS PROVISIONING',  icon:'fa fa-microchip', class: 'text-black',HeaderTitle:'THINGS PROVISIONING',child:[  ] },
    { path: '/typography', title: 'CONFIGURATION',  icon:'fa fa-cog', class: 'text-black' ,HeaderTitle:'CONFIGURATION',child:[ ]},
    { path: '/icons', title: 'USERMANAGEMENT',  icon:'fa fa-user', class: 'text-black' ,HeaderTitle:'USERMANAGEMENT',child:[  ]},
       
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({opacity:0}),
        animate(500, style({opacity:1})) 
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(500, style({opacity:0})) 
      ])
    ])
  ]
  
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
