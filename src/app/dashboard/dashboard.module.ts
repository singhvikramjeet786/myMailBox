import { NgModule } from '@angular/core';
import { DashboradRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { InboxComponent } from '../components/inbox/inbox.component';
import { MaterialModule } from '../material/material';
import { CommonModule } from '@angular/common';
import { ShareddModule } from '../shared/shared.module';
import { TrashComponent } from '../components/trash/trash.component';
import { FooterComponent } from '../components/footer/footer.component';
import { DraftComponent } from '../components/draft/draft.component';
import { SentComponent } from '../components/sent/sent.component';
import { ComposeMailComponent } from '../components/compose-mail/compose-mail.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardComponent,
    InboxComponent,
    TrashComponent,
    FooterComponent,
    DraftComponent,
    SentComponent,
    ComposeMailComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ShareddModule,
    ReactiveFormsModule,
    DashboradRoutingModule
  ],
  providers: [],
})
export class DashboardModule { }
