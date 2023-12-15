import { Component } from '@angular/core';
import json123 from 'src/assets/Variables List/Production/MasterPanel.json'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';
  constructor()
  {
    var list = []
    json123.map(x => {
      if(x.aspectName == 'MasterPanelData1')
      {
        list.push(x)
      }
    })

    //console.log(list)
  }
}
