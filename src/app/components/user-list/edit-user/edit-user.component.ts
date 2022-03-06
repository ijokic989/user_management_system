import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UserManagementService } from '../../../services/user-management.service'
import { User } from '../../../models/user.model';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  
  constructor(
      private _ActivatedRoute: ActivatedRoute,
      private _UserManagementService: UserManagementService,
      private _Router: Router,
      private _NotificationService: NotificationService
    ) {
    this.userId = this._ActivatedRoute.snapshot.paramMap.get("userId");
  }

  selectStatuses = [{value: 'active', title:'Active'}, {value: 'blocked', title:'Blocked'}];

  public userId: any;
  public user: User = new User();
  public userEditForm = new FormGroup({
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    username: new FormControl({value: '', disabled: true}, [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    status: new FormControl('active', [Validators.required]),
  });

  ngOnInit(): void {
    if (this.userId)
      this.getUser();
  }

  // Retrive user via service by user ID
  getUser() {
    this._UserManagementService.getUserData(this.userId).subscribe(user => {
      this.user = user;
      this.updateFormValues();
    });
  }

  // submit user form values and redirect to user list page
  onSubmit() {
    let prepareData = this.userEditForm.value;
    prepareData.id = this.userId;
    this._UserManagementService.updateUserData(prepareData).subscribe( response => {
      this._NotificationService.showSuccess('User Updated Successfully!', 'Success!');
      this._Router.navigate(['/user-list/']);
    });
  }

  updateFormValues() {
    for (const [key, value] of Object.entries(this.user)) {
      if (this.userEditForm.controls[key]) 
        this.userEditForm.controls[key].patchValue(value);
    }
  }
}
