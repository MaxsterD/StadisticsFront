import { Routes } from '@angular/router';
import { LinkStatisticsComponent } from './component/link-statistics/link-statistics';


export const routes: Routes = [
    { path: '', component: LinkStatisticsComponent },
    { path: '**', redirectTo: '' }
];


