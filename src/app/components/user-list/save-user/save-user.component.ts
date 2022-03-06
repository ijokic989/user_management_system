import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from '../../../models/user.model';
import { UserManagementService } from '../../../services/user-management.service'
import { NotificationService } from '../../../services/notification.service';
@Component({
  selector: 'app-save-user',
  templateUrl: './save-user.component.html',
  styleUrls: ['./save-user.component.scss']
})
export class SaveUserComponent implements OnInit {

  constructor(private _UserManagementService: UserManagementService,
      private _Router: Router,
      private _NotificationService: NotificationService
    ) { }

  ngOnInit(): void {
  }
  public selectStatuses = [{value: 'active', title:'Active'}, {value: 'blocked', title:'Blocked'}];
  public user: User = new User();
  public userSaveForm = new FormGroup({
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    status: new FormControl(true, [Validators.required]),
  });

  onSubmit() {
    let prepareData = this.userSaveForm.value;
    this.addNewUser(prepareData);
  }

  updateFormValues() {
    for (const [key, value] of Object.entries(this.user)) {
      if (this.userSaveForm.controls[key]) 
        this.userSaveForm.controls[key].patchValue(value);
    }
  }

  addNewUser(prepareData : User) {
    this._UserManagementService.addNewUser(prepareData).subscribe(response => {
      this._NotificationService.showSuccess('New User Added Successfully', 'Success!');
      this._Router.navigate(['/user-list/']);
    })
  }
}
