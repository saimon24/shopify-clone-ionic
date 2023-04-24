import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  RendererStyleFlags2,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  DomController,
  Gesture,
  GestureController,
  GestureDetail,
  IonRouterOutlet,
  IonicModule,
  Platform,
  isPlatform,
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
  @ViewChild('dropdownBtn') dropdownBtn!: ElementRef;
  gesture?: Gesture;
  divBottomPosition: number = -170;
  tabsHeight: number = isPlatform('ios') ? 51 : 56;

  constructor(
    private routerOutlet: IonRouterOutlet,
    private gestureCtrl: GestureController,
    private domCtrl: DomController,
    private renderer: Renderer2,
    private platform: Platform
  ) {
    this.presentingElement = this.routerOutlet.nativeEl;
  }

  ngOnInit() {
    setTimeout(() => {
      this.loading = false;
    }, 1500);
  }

  ngAfterViewInit(): void {
    this.createGesture();
  }

  createGesture() {
    this.gesture = this.gestureCtrl.create(
      {
        el: this.myDiv.nativeElement,
        threshold: 0,
        gestureName: 'my-gesture',
        onMove: (ev) => this.onMoveHandler(ev),
        onStart: () => this.onStartHandler(),
        onEnd: () => this.onStartEnd(true),
      },
      true
    );
    this.gesture.enable();
  }

  onStartHandler() {
    this.renderer.setStyle(
      this.myDiv.nativeElement,
      '--transition-duration',
      '0',
      RendererStyleFlags2.DashCase
    );
  }

  onMoveHandler(ev: GestureDetail) {
    let bottom: number = this.getBottom(ev.deltaY);
    this.domCtrl.write(() => this.writeStyle(bottom));
  }

  private onStartEnd(shouldEnableTransition: boolean = false) {
    this.renderer.setStyle(
      this.myDiv.nativeElement,
      '--transition-duration',
      `${shouldEnableTransition ? 300 : 0}ms`,
      RendererStyleFlags2.DashCase
    );
    this.divBottomPosition = this.getDivBottom();

    if (this.divBottomPosition > -85) {
      this.domCtrl.write(() => this.writeStyle(0));
    } else {
      this.domCtrl.write(() => this.writeStyle(-170));
    }
  }

  private writeStyle(bottom: number) {
    this.renderer.setStyle(
      this.dropdownBtn.nativeElement,
      'rotate',
      `${bottom > -90 ? 180 : 0}deg`
    );
    this.renderer.setStyle(this.myDiv.nativeElement, 'bottom', `${bottom}px`);
  }

  toggleBottomSheet() {
    this.domCtrl.write(() => {
      this.renderer.setStyle(
        this.myDiv.nativeElement,
        'bottom',
        `${this.getDivBottom() < -90 ? 0 : -170}px`
      );
      this.renderer.setStyle(
        this.dropdownBtn.nativeElement,
        'rotate',
        `${this.getDivBottom() < -90 ? -180 : 0}deg`
      );
    });
  }

  private getDivBottom() {
    return (
      this.platform.height() -
      this.tabsHeight -
      this.myDiv.nativeElement.getBoundingClientRect().bottom
    );
  }

  private getBottom(deltaY: number) {
    let bottom = this.divBottomPosition - deltaY;
    if (bottom > 0) return (bottom = 0);
    if (bottom < -170) return -170;
    return bottom;
  }
}
