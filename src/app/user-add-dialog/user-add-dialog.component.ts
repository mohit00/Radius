import { Component, OnInit } from '@angular/core';
  import { Subject } from 'rxjs';
import { AuthService } from '../auth.service';
import { BsModalRef } from 'ngx-bootstrap';
import Stepper from 'bs-stepper';

@Component({
  selector: 'app-user-add-dialog',
  templateUrl: './user-add-dialog.component.html',
  styleUrls: ['./user-add-dialog.component.scss']
})
export class UserAddDialogComponent implements OnInit {
  data:any = {
    contactInfo:{
      country:1
    }
  }
  constructor(private AuthService:AuthService, private _bsModalRef: BsModalRef) { }
  public onClose: Subject<boolean>;
getCountryList:any;
private stepper: Stepper;

  ngOnInit() {
    this.onClose = new Subject();
 
    this.getCountryList =   this.AuthService.CountryList;

    this.stepper = new Stepper(document.querySelector('#stepper1'), {
      linear: false,
      animation: true
    });
}
next() {
  this.stepper.next();
}
onSubmit() {
  return false;
}
submitData() {
  this.AuthService.addUser(this.data).subscribe(res=>{
     this.AuthService.suceesAlertDialog("User Successfully Created")
     this._bsModalRef.hide();
     this.onClose.next(true);

 })
}

}
