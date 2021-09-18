import { NgModule } from '@angular/core';
import { MaterialModule } from '../material/material';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { PreviewComponent } from './preview/preview.component';
const components = [
    ListComponent,
    PreviewComponent
]
@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [ ...components ],
  providers: [],
})
export class ShareddModule { }
