import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy } from '@angular/core';
import { Subscription, Subject, debounceTime } from 'rxjs';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements AfterViewInit, OnDestroy {
  debounceTime: number = 200;
  loading: boolean = false;
  loadingSubscription!: Subscription;
  private _destroy$ = new Subject<boolean>();

  constructor(
    private loadingService: LoadingService,
    private _elmRef: ElementRef,
    private _changeDetectorRef: ChangeDetectorRef) {
  }

  ngAfterViewInit(): void {
    this._elmRef.nativeElement.style.display = 'none';
    this.loadingSubscription = this.loadingService.loadingStatus
      .pipe(debounceTime(this.debounceTime))
      .subscribe((status: boolean) => {
          this._elmRef.nativeElement.style.display = status ? 'block' : 'none';
          this._changeDetectorRef.detectChanges();
        }
      );
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
    this._destroy$.next(true);
    this._destroy$.complete();
  }
}
