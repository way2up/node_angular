import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablesComponent } from './tables.component';
import { AllCandidatesTableComponent } from './all-candidates/allCandidates.component';
import { TreeGridComponent } from './tree-grid/tree-grid.component';
import { CandidatePageComponent } from './candidate-page/candidate-page.component';
import { SkillsOfCandidateComponent } from './skills-of-candidate/skills-of-candidate.component';
import { StatusesComponent } from './statuses/statuses.component';

const routes: Routes = [{
  path: '',
  component: TablesComponent,
  children: [
    {
      path: 'smart-table',
      component: AllCandidatesTableComponent,
    },
    {
      path: 'skills',
      component: SkillsOfCandidateComponent,
    },
    {
      path: 'statuses',
      component: StatusesComponent,
    },
    {
      path: 'tree-grid',
      component: TreeGridComponent,
    },
    {
      path: 'candidateInfo',
      component: CandidatePageComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablesRoutingModule { }

export const routedComponents = [
  TablesComponent,
  AllCandidatesTableComponent,
  TreeGridComponent,
  CandidatePageComponent,
  SkillsOfCandidateComponent,
  StatusesComponent
];
