import { Injectable, Injector } from '@angular/core';
import { Overlay, GlobalPositionStrategy } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { Toast } from './toast.component';
import { ToastRef } from './toast-ref';
import { ToastData } from './toast-config';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private lastToast: ToastRef;
  private pos: number = 0;

  constructor(private overlay: Overlay, private parentInjector: Injector) {}

  show(data: ToastData): ToastRef {
    let positionStrategy: GlobalPositionStrategy;
    if (!data.position) {
      positionStrategy = this.getRightTopPositionStrategy(
        data.margin ? data.margin : 10
      );
    } else {
      switch (data.position) {
      case 'left-top':
        positionStrategy = this.getLeftTopPositionStrategy(
          data.margin ? data.margin : 10
        );
        break;
      case 'right-top':
        positionStrategy = this.getRightTopPositionStrategy(
          data.margin ? data.margin : 10
        );
        break;
      case 'left-bottom':
        positionStrategy = this.getLeftBottomPositionStrategy(
          data.margin ? data.margin : 10
        );
        break;
      case 'right-bottom':
        positionStrategy = this.getRightBottomPositionStrategy(
          data.margin ? data.margin : 10
        );
        break;
      default:
        positionStrategy = this.getRightTopPositionStrategy(
          data.margin ? data.margin : 10
        );
        break;
      }
    }
    const overlayRef = this.overlay.create({ positionStrategy });
    const toastRef = new ToastRef(overlayRef);
    this.lastToast = toastRef;
    const injector = this.getInjector(data, toastRef, this.parentInjector);
    const toastPortal = new ComponentPortal(Toast, null, injector);
    overlayRef.attach(toastPortal);

    return toastRef;
  }

  getRightBottomPositionStrategy(margin: number): GlobalPositionStrategy {
    return this.overlay
      .position()
      .global()
      .bottom(this.getPositionBot(margin))
      .right(margin + 'px');
  }

  getLeftBottomPositionStrategy(margin: number): GlobalPositionStrategy {
    return this.overlay
      .position()
      .global()
      .bottom(this.getPositionBot(margin))
      .left(margin + 'px');
  }

  getRightTopPositionStrategy(margin: number): GlobalPositionStrategy {
    return this.overlay
      .position()
      .global()
      .top(this.getPositionTop(margin))
      .right(margin + 'px');
  }

  getLeftTopPositionStrategy(margin: number): GlobalPositionStrategy {
    return this.overlay
      .position()
      .global()
      .top(this.getPositionTop(margin))
      .left(margin + 'px');
  }

  getPositionTop(margin: number): string {
    const lastToastIsVisible = this.lastToast && this.lastToast.isVisible();
    const position = lastToastIsVisible
      ? this.lastToast.getPosition().bottom
      : margin;

    return position + 'px';
  }

  getPositionBot(margin: number): string {
    const lastToastIsVisible = this.lastToast && this.lastToast.isVisible();

    if (lastToastIsVisible) {
      this.pos +=
        this.lastToast.getPosition().bottom - this.lastToast.getPosition().top;
      return this.pos + 'px';
    } else {
      this.pos = margin;
      return this.pos + 'px';
    }
  }

  getInjector(
    data: ToastData,
    toastRef: ToastRef,
    parentInjector: Injector
  ): PortalInjector {
    const tokens = new WeakMap();

    tokens.set(ToastData, data);
    tokens.set(ToastRef, toastRef);

    return new PortalInjector(parentInjector, tokens);
  }
}
