import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonRouterOutlet, IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class DetailsPage implements OnInit {
  loading = true;
  presentingElement: HTMLIonRouterOutletElement;

  constructor(private routerOutlet: IonRouterOutlet) {
    this.presentingElement = this.routerOutlet.nativeEl;
  }

  ngOnInit() {
    setTimeout(() => {
      // this.loading = false;
    }, 1500);
  }
}
