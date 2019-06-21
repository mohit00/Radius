import { Component, OnInit } from '@angular/core';
import {WebserModel} from '../../Service.model';
import {AuthService} from '../../auth.service';
@Component({
  selector: 'app-device-provisiong-detail',
  templateUrl: './device-provisiong-detail.component.html',
  styleUrls: ['./device-provisiong-detail.component.scss']
})
export class DeviceProvisiongDetailComponent implements OnInit {
  ComandId: any;
  ComandDetail: any;
// tslint:disable-next-line: no-shadowed-variable
  constructor(private WebserModel: WebserModel, private Service: AuthService) { }
  getDetailEvent() {
    this.ComandId  =  this.Service.getId;
    this.Service.getDetail(this.ComandId).subscribe(res => {
      console.log(JSON.stringify(res));
      this.ComandDetail = res;
    });
     }
  ngOnInit() {
    this.getDetailEvent();
  }

}
