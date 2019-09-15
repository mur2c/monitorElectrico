import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule',
    canActivate: [AuthGuard] //route path protected , only logged in users can access. See auth.guard.ts
  },
  { path: 'login', loadChildren: './auth/login/login.module#LoginPageModule' },
  { path: 'logout', loadChildren: './auth/logout/logout.module#LogoutPageModule' },
  { path: 'config', loadChildren: './config/config.module#ConfigPageModule' },
  { path: 'config/:id', loadChildren: './config/config.module#ConfigPageModule' },
  { path: 'monitor', loadChildren: './monitor/monitor.module#MonitorPageModule' },
  { path: 'monitor/:id', loadChildren: './monitor/monitor.module#MonitorPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
