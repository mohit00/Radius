import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
data: any  ;
  constructor() {
    this.data =
      [
          {
              data: {
                  name: 'Andrew',
                  gender: 'Male'
              },
              children: [
                  {
                      data: {
                          name: 'Andrewson',
                          gender: 'Male'
                      },
                      children: [
                          {
                              data: {
                                  name: 'Eric' ,
                                  gender: 'Male'
                              },
                              children: [
                                {
                                    data: {
                                        name: 'Eric2' ,
                                        gender: 'Male'
                                    },
                                    children: [
                                      {
                                          data: {
                                              name: 'Eric3' ,
                                              gender: 'Male'
                                          },
                                        }
                                  ]
                                }
                            ]

                          }
                      ]
                  }
              ]
          }
      ];

  }

  ngOnInit() {
  }

}
