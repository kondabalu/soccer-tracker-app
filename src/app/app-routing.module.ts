import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SoccerTrackerComponent } from './src/soccer-tracker/soccer-tracker.component';

const routes: Routes = [{path:'',component:SoccerTrackerComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
