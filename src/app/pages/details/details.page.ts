import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  DomController,
  Gesture,
  GestureController,
  IonRouterOutlet,
  IonicModule,
} from '@ionic/angular';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class DetailsPage implements OnInit, AfterViewInit {
  loading = true;
  presentingElement: HTMLIonRouterOutletElement;
  @ViewChild('myDiv') myDiv!: ElementRef;
  gesture?: Gesture;
  sheetOpen = false;

  constructor(
    private routerOutlet: IonRouterOutlet,
    private gestureCtrl: GestureController,
    private domCtrl: DomController,
    private renderer: Renderer2
  ) {
    this.presentingElement = this.routerOutlet.nativeEl;
  }

  ngOnInit() {
    setTimeout(() => {
      // this.loading = false;
    }, 1500);
  }

  ngAfterViewInit(): void {
    // this.addGestureHandler();
  }

  toggleBottomSheet() {
    this.domCtrl.write(() => {
      if (!this.sheetOpen) {
        this.renderer.setStyle(
          this.myDiv.nativeElement,
          'webkitTransform',
          `translate3d(0, 100px, 0)`
        );
      } else {
        this.renderer.setStyle(
          this.myDiv.nativeElement,
          'webkitTransform',
          `translate3d(0, 240px, 0)`
        );
      }
      this.sheetOpen = !this.sheetOpen;
    });
  }

  addGestureHandler() {
    this.gesture = this.gestureCtrl.create({
      el: this.myDiv.nativeElement,
      gestureName: 'my-gesture',
      threshold: 0,
      onMove: (ev) => this.handleMove(ev),
      onEnd: (ev) => this.handleEnd(ev),
    });
    this.gesture.enable();
  }

  handleMove(ev: any) {
    const deltaY = ev.deltaY;
    // console.log('deltaY:', deltaY);
    // const y = this.myDiv.nativeElement.style.transform;
    // console.log('y:', y);
    // const newY = Math.min(0, Math.max(y + deltaY, -300));
    // this.myDiv.nativeElement.style.transform = `translateY(${deltaY}px)`;

    // const move = y + ev.deltaY;

    this.domCtrl.write(() => {
      if (move >= 240 || move <= 100) {
        return;
      }
      this.renderer.setStyle(
        this.myDiv.nativeElement,
        'webkitTransform',
        `translate3d(0, ${deltaY}px, 0)`
      );
    });
  }

  handleEnd(ev: any) {
    console.log('END');

    // Handle end of gesture
  }
}
