import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-command-template-detail',
  templateUrl: './command-template-detail.component.html',
  styleUrls: ['./command-template-detail.component.scss']
})
export class CommandTemplateDetailComponent implements OnInit {
  ComandId: any;
  data:any;
  ComandDetail: any;
    constructor(private  Service: AuthService,private route:Router) {this.data = {}; }
    getDetailEvent() {
   this.ComandId  =  this.Service.getId;
   this.Service.getDetail(this.ComandId).subscribe(res=>{
     console.log(JSON.stringify(res))
     this.ComandDetail = res;
   });
    }
    
    
    changeFreeze() {
      this.ComandDetail.freeze = this.data.check;
      this.Service.freezeData(this.ComandDetail, this.ComandId).subscribe(res => {
        this.Service.suceesAlertDialog('Command has been successfully Freezed.' );
        this.route.navigate(['Command/Template']);
       });
    }
    ngOnInit() {
      this.getDetailEvent();
    }
  
  }
  