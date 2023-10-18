
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [



  {
    path:'landing',
    loadChildren: () => import('./public/public.module').then( m => m.publicModule),

  },
  {
    path: '',
    redirectTo: 'landing',
    pathMatch:'prefix',
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
