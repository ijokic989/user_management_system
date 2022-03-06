import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

import { UserInterface } from '../interface/user.interface';
import { UserPermissionsInterface } from '../interface/user.permissions.interface';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
  baseUrl: string;

  constructor(private _http: HttpClient) {
    this.baseUrl = `${environment.urlAddress}`;
  }

  // Get user list data
  getUserListData(page = 1, limit = 10): Observable<UserInterface[]> {
    return this._http.get<UserInterface[]>(
      `${this.baseUrl}/users/`);
      // `${this.baseUrl}/users/?_page=${page}&_limit=${limit}`);
  }

  // Get user data
  getUserData(userId:any): Observable<UserInterface> {
    return this._http.get<UserInterface>(
      `${this.baseUrl}/users/${userId}`);
  }

  // Update user
  updateUserData(data: UserInterface) {
    return this._http.patch<UserInterface>(
      `${this.baseUrl}/users/${data.id}`, data);
  }
    // Update user
    addNewUser(data: UserInterface) {
      return this._http.post<UserInterface>(
        `${this.baseUrl}/users/`, data);
    }

  // Delete user
  deleteUserListData(id: number): Observable<UserInterface> {
    return this._http.delete<UserInterface>(
      `${this.baseUrl}/users/${id}`);
  }

    // Get user list data
    getUserPermisionData(): Observable<UserPermissionsInterface[]> {
      return this._http.get<UserPermissionsInterface[]>(
        `${this.baseUrl}/permissions/`);
    }
}
