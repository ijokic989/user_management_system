import { Injectable } from '@angular/core';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataSubscriptionService {

  public $isDeleted = new Subject<number>();

  constructor() { }
}
