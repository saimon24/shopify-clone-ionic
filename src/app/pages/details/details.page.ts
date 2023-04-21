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
  IonModal,
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
  @ViewChild('trigger') trigger!: ElementRef;

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
      this.loading = false;
    }, 1500);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.trigger.nativeElement.click();
    }, 100);
  }

  async breakpointChanged(modal: IonModal) {
    const breakpoint = await modal.getCurrentBreakpoint();
    this.sheetOpen = breakpoint === 0.25;
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
}
