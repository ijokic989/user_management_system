import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserManagementService } from '../../services/user-management.service';
import { DataSubscriptionService } from '../../services/data-subscription.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public modalData: any,
    private _UserManagementService: UserManagementService,
    private _DataSubscriptionService: DataSubscriptionService,
    private _NotificationService: NotificationService
  ) {
    console.log(this.modalData);
   }

  ngOnInit(): void {
  }

  closeModal() {
    this.dialogRef.close();
  }


  modalAction() {
    this._UserManagementService.deleteUserListData(this.modalData.userId).subscribe(response => {
      this._NotificationService.showWarning('User Deleted!', 'Success!');
      // emit the new value in observable so other components can subscribe
      this._DataSubscriptionService.$isDeleted.next(this.modalData.userId);
    })
  }
}
