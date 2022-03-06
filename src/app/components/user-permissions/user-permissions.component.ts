import { Component, OnInit } from '@angular/core';

import { NotificationService } from '../../services/notification.service';
import { UserManagementService } from '../../services/user-management.service'
import { DataSubscriptionService } from '../../services/data-subscription.service';
import { UserPermissions } from '../../models/user.permissions.model';
import { UserPermissionsInterface } from '../../interface/user.permissions.interface';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-permissions',
  templateUrl: './user-permissions.component.html',
  styleUrls: ['./user-permissions.component.scss']
})
export class UserPermissionsComponent implements OnInit {

  constructor(
      private _UserManagementService: UserManagementService,
      private _ActivatedRoute: ActivatedRoute,
      private _NotificationService: NotificationService
    ) {
    this.userId = this._ActivatedRoute.snapshot.paramMap.get("userId");
  }
  
  public userPermissionsForm = new FormGroup({
    permissionsListControl: new FormControl(''),
  });

  public user = new User();
  public userId: any;
  public currentUserPermissions: Array<string> = [];
  public userPermissions: UserPermissionsInterface[] = [];
  public permissions: UserPermissionsInterface[] = [];
  

  ngOnInit(): void {
    this.getUserPermissions();
  }

  // Retrieve current user permissions
  getUser() {
    this._UserManagementService.getUserData(this.userId).subscribe(user => {
      if (this.userId) {
        this.user = user;
        if (this.user.permissions) {
          this.currentUserPermissions = this.user.permissions;
          this.userPermissions = this.permissions.filter(item => this.currentUserPermissions.includes(item.code))
        }
      }
    });
  }

  // Get all available permissions
  getUserPermissions() {
    this._UserManagementService.getUserPermisionData().subscribe(data => {
      this.permissions = data;
      this.getUser();
    });
  }

  // Update user permissions
  savePermissions() {
    if (this.userPermissionsForm.value['permissionsListControl']) {
      this.user.permissions = this.userPermissionsForm.value['permissionsListControl'];
      this.userPermissions = this.permissions.filter(item => this.userPermissionsForm.value['permissionsListControl'].includes(item.code))
      this._UserManagementService.updateUserData(this.user).subscribe( response => {
        this._NotificationService.showSuccess('User Permissions updated Successfully', 'Success!')
      })
    }
  }

  removeUserPermission(code: string) {
    this.userPermissions = this.userPermissions.filter(item => item.code != code);
    this.user.permissions = this.user.permissions.filter(item => item != code);
    this.userPermissionsForm.value['permissionsListControl'] = this.user.permissions;
    this._UserManagementService.updateUserData(this.user).subscribe( response => {
    })
  }
}
