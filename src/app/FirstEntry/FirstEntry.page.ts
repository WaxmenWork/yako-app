import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/storage';
import { INTRO_KEY } from '../guards/intro.guard';

@Component({
  selector: 'app-FirstEntry',
  templateUrl: 'FirstEntry.page.html',
  styleUrls: ['FirstEntry.page.scss']
})
export class FirstEntryPage {

  constructor(private router: Router) {}

  async start() {
    await Storage.set({key: INTRO_KEY, value: 'true'});
  }

}
