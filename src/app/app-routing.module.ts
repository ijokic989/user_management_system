import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { EditUserComponent } from  './components/user-list/edit-user/edit-user.component';
import { SaveUserComponent } from './components/user-list/save-user/save-user.component';
import { UserPermissionsComponent } from './components/user-permissions/user-permissions.component';

const routes: Routes = [
  { path: 'user-list', component: UserListComponent},
  { path: '', redirectTo: '/user-list', pathMatch: 'full' },
  { path: 'edit-user/:userId', component: EditUserComponent},
  { path: 'create-user', component: SaveUserComponent},
  { path: 'user-permissions/:userId', component: UserPermissionsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
