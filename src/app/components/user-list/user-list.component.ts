import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormGroup, FormControl } from '@angular/forms';

import { NotificationService } from '../../services/notification.service';
import { UserManagementService } from '../../services/user-management.service'
import { DataSubscriptionService } from '../../services/data-subscription.service';
import { UserInterface } from '../../interface/user.interface';
import { Subscription } from "rxjs";
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  private deleteSubscription: Subscription = new Subscription();
  
  constructor(
    private _UserManagementService: UserManagementService,
    public NotificationService: NotificationService,
    private _DataSubscriptionService: DataSubscriptionService,
  ) { }

  @ViewChild(MatPaginator) paginator: any;
  
  userSearchForm = new FormGroup({
    first_name: new FormControl('', []),
    last_name: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl(''),
    status: new FormControl(''),
  });

  public displayedColumns = [
    'first_name',
    'last_name',
    'username',
    'password',
    'email',
    'status',
    'update',
    'delete',
    'assign'
  ];

  public filterValues = [
    'first_name',
    'last_name',
    'username',
    'password',
    'email',
    'status'
];

  public dataSource = new MatTableDataSource<UserInterface>();
  public userData: UserInterface[] = [];

  @ViewChild(MatSort) sort: MatSort = new MatSort;

  ngOnInit(): void {
    this.getUsers();
    this.fieldListener();

    // subscribe to item delete event
    this.deleteSubscription = this._DataSubscriptionService.$isDeleted.subscribe((isDeleted: number) => {
      if (isDeleted) {
        this.dataSource.data = this.dataSource.data.filter(item => item.id != isDeleted);
      }
    });
  }

  ngAfterViewInit(): void {

    // Setup the paginator for table
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // Retrieve the list of available user via http service
  getUsers() {
    this._UserManagementService.getUserListData().subscribe((data) => {
      this.userData = data;
      this.dataSource.data = this.userData;
      this.dataSource.filterPredicate = this.createFilter();
    }); 
  }

  // Add value change listener to form input fields in order to filter the results
  private fieldListener() {
    this.filterValues.forEach(field_name => {
      this.userSearchForm.get(field_name)?.valueChanges
      .subscribe(
        value => {
          this.dataSource.filter = JSON.stringify({field_name, value});
        }
      )
    });
  }

  // Add logic for filtering results based on form control values
  private createFilter(): (user: any, filter: string) => boolean {
    let filterFunction = function (user: any, filter: string): boolean {
      let searchTerms = JSON.parse(filter);
      return user[`${searchTerms.field_name}`].toLowerCase().indexOf(searchTerms.value.toLowerCase()) !== -1
    }

    return filterFunction;
  }

  pageChanged(event: any) {

  }

  // Trigger confirmation dialog on delete user action
  onDeleteUser(id: string) {
    this.NotificationService.openDialog(true, '#dialog-component', '350px', '550px', 
      {
        title: 'Please confirm!',
        description: 'Are you sure you want to delete this user?',
        action: 'Delete',
        userId: id
      }
    )
  }

  ngOnDestroy() {
    if (this.deleteSubscription) {
      this.deleteSubscription.unsubscribe();
    }
  }
}
