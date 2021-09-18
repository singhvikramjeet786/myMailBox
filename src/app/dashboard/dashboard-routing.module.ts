import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DraftComponent } from '../components/draft/draft.component';
import { InboxComponent } from '../components/inbox/inbox.component';
import { SentComponent } from '../components/sent/sent.component';
import { TrashComponent } from '../components/trash/trash.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  { path:'', redirectTo: 'inbox', pathMatch: 'full'},
  { 
    path:'', 
    component:DashboardComponent,
    children: [
      {path: 'inbox', component:InboxComponent},
      {path: 'sent', component:SentComponent},
      {path: 'draft', component:DraftComponent},
      {path: 'trash', component:TrashComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboradRoutingModule { }
