import { NgModule, ModuleWithProviders } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { Toast } from './toast.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [OverlayModule, CommonModule],
  entryComponents: [Toast],
  declarations: [Toast]
})
export class ToastModule {
  public static forRoot(): ModuleWithProviders {
    return { ngModule: ToastModule };
  }
}
