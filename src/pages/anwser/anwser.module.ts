import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnwserPage } from './anwser';
import { PipesModule } from '../../pipes/pipes.module';
import { AngularFirestoreModule } from 'angularfire2/firestore';


@NgModule({
  declarations: [
    AnwserPage,
  ],
  imports: [
    AngularFirestoreModule,
    IonicPageModule.forChild(AnwserPage),
    PipesModule
  ],
})
export class AnwserPageModule {}
