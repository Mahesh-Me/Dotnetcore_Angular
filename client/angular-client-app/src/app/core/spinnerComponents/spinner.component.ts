import { Component, Input, ViewEncapsulation } from '@angular/core';
import { SpinnerService } from '../services/spinner.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-spinner',
  standalone: true,
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css',
  encapsulation: ViewEncapsulation.None
})
export class SpinnerComponent {

  isLoading:any;
  subscription?: Subscription;
  showSpinner:boolean = false;
  _threshold = 500;

  @Input()
  public set threshold(value: number) {
    this._threshold = value;
  }
  public get threshold(): number {
    return this._threshold;
  }

  constructor(
    private _spinner:SpinnerService
  ){
    this.createServiceSubscription();
  }

  createServiceSubscription() {
    let timer: any;

    this.subscription = this._spinner.getMessage().subscribe((show: boolean) => {
      if (show) {
        if (timer) {
          return; // Avoid resetting the timer if it’s already running
        }
        timer = setTimeout(() => {
          timer = null; // Clear the timer reference
          this.showSpinner = show; 
        }, this.threshold);
      } else {
        if (timer) {
          clearTimeout(timer); // Clear the timer
          timer = null;
        }
        this.showSpinner = false; 
      }
    });
  }
  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
