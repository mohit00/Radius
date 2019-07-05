import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

import {AuthService} from '../auth.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-add-field-dialog',
  templateUrl: './add-field-dialog.component.html',
  styleUrls: ['./add-field-dialog.component.scss']
})
export class AddFieldDialogComponent implements OnInit {
  dataList: any;
  id: any;
  data: any;
  constructor(private _bsModalRef: BsModalRef, private Service: AuthService) { }
  getDetailDeviceProvisioning() {
    this.Service.getDetail(this.id).subscribe(res => {
      this.data = res;

      this.dataList = [];
      if (this.data.metadata) {
     let j = 0 ;
     for (const i in this.data.metadata) {
       if (j == 0) {
         this.dataList.push({
           class : 'col-md-6',
           class1: 'col-md-6',
           class5: 'col-md-2',

           type: '1',
           class2: 'col-md-6',
           class3: 'col-md-10',
           class4: 'plustbutton',
           name: i,
           value: this.data.metadata[i]
         });
       } else {
         this.dataList.push({
           type: '1',
           class : 'col-md-6',
           class1: 'col-md-6',
           class2: 'col-md-6',
           class3: 'col-md-8' ,
           class4: 'plusbutonafter',
           class5: 'col-md-2',
           name: i,
           value: this.data.metadata[i]
         });

       }

       j++;
     }
   }


   });
   }
  ngOnInit() {
    this.dataList = [{
      class : 'col-md-6',
      class1: 'col-md-6',
      class5: 'col-md-2',

      type: '1',
      class2: 'col-md-6',
      class3: 'col-md-10',
      class4: 'plustbutton'
       }
  ];
  }
  updateDevicePro(){}

}
