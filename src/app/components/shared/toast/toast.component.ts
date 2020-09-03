import { Component, OnInit, OnDestroy } from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { ToastData } from './toast-config';
import { ToastRef } from './toast-ref';
import { toastAnimations, ToastAnimationState } from './toast-animation';
import { ConfigurationService } from 'src/app/services/configuration-service';

@Component({
  selector: 'app-toast',
  templateUrl: 'toast.component.html',
  styleUrls: ['toast.component.scss'],
  animations: [toastAnimations.fadeToast]
})
export class Toast implements OnInit, OnDestroy {
  animationState: ToastAnimationState = 'default';
  private intervalId: NodeJS.Timer;

  constructor(
    readonly data: ToastData,
    readonly ref: ToastRef,
    readonly configure: ConfigurationService
  ) {}

  ngOnInit(): void {
    this.intervalId = setTimeout(
      () => (this.animationState = 'closing'),
      this.data.delay ? this.data.delay : this.configure.defaultToastDelay
    );
  }

  ngOnDestroy(): void {
    clearTimeout(this.intervalId);
  }

  close(): void {
    this.ref.close();
  }

  onFadeFinished(event: AnimationEvent): void {
    const { toState } = event;
    const isFadeOut = (toState as ToastAnimationState) === 'closing';
    const itFinished = this.animationState === 'closing';

    if (isFadeOut && itFinished) {
      this.close();
    }
  }
}
