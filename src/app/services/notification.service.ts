import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from '../components/dialog/dialog.component';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(public MatDialog: MatDialog, private toastr: ToastrService) { }
  
  openDialog(disableClose: boolean, id: string, height: string, width: string, data: any,) {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = disableClose;
    dialogConfig.id = id;
    dialogConfig.height = height;
    dialogConfig.width = width;
    dialogConfig.data = {
      name: data.name,
      title: data.title,
      description: data.description,
      actionButtonText: data.action,
      userId: data.userId,
    }
    const modalDialog = this.MatDialog.open(DialogComponent, dialogConfig);
  }
  showSuccess(message: string, title: string) {
    this.toastr.success(message, title);
  }

  showError(message: string, title: string) {
    this.toastr.error(message, title);
  }

  showWarning(message: string, title: string) {
    this.toastr.warning(message, title);
  }
}
