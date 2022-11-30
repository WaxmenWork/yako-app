import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AutoLoginGuard } from './guards/auto-login.guard';
import { IntroGuard } from './guards/intro.guard';

const routes: Routes = [
  {
    path: 'loginpage',
    loadChildren: () => import('./loginpage/loginpage.module').then( m => m.LoginpagePageModule),
    canLoad: [IntroGuard, AutoLoginGuard]
  },
  {
    path: 'RegistrationPage',
    loadChildren: () => import('./RegistrationPage/RegistrationPage.module').then(m => m.RegistrationPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'FirstEntry',
    loadChildren: () => import('./FirstEntry/FirstEntry.module').then(m => m.FirstEntryPageModule)
  },
  {
    path: 'add-food',
    loadChildren: () => import('./add-food/add-food.module').then( m => m.AddFoodPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: '',
    redirectTo: '/FirstEntry',
    pathMatch: 'full'
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'show-food/:id',
    loadChildren: () => import('./show-food/show-food.module').then( m => m.ShowFoodPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'show-diet/:id',
    loadChildren: () => import('./show-diet/show-diet.module').then( m => m.ShowDietPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'friends',
    loadChildren: () => import('./friends/friends.module').then( m => m.FriendsPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'statistics',
    loadChildren: () => import('./statistics/statistics.module').then( m => m.StatisticsPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'achivements',
    loadChildren: () => import('./achivements/achivements.module').then( m => m.AchivementsPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'notice',
    loadChildren: () => import('./notice/notice.module').then( m => m.NoticePageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'profile/:id',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'show-training/:id',
    loadChildren: () => import('./show-training/show-training.module').then( m => m.ShowTrainingPageModule),
    canLoad: [AuthGuard]
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
