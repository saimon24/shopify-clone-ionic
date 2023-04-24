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
  divBottom: number = -170;

  constructor(
    private routerOutlet: IonRouterOutlet,
    private gestureCtrl: GestureController,
    private domCtrl: DomController,
    private renderer: Renderer2,
    private platform:Platform,
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
    this.gesture = this.gestureCtrl.create({
      el: this.myDiv.nativeElement,
      threshold: 0,
      gestureName: 'my-gesture',
      onMove: ev => this.onMoveHandler(ev),
      onStart: () => this.onStartEnd(),
      onEnd: () => this.onStartEnd(true)
    });
    this.gesture.enable()
  }

  private onStartEnd(shouldEnableTransition:boolean = false) {
    this.renderer.setStyle(this.myDiv.nativeElement, '--transition-duration', `${shouldEnableTransition ? 300 : 0}ms`, RendererStyleFlags2.DashCase);
    this.divBottom = this.getDivBottom();

    // The following should work, I feel like the logic makes sense but somehow it just doesn't. It Almost works on web but on the device it completely breaks
    // if bottom sheet is not fully closed
    if(this.divBottom >= -170 && this.divBottom <  -85) return this.writeStyle(-170);
    // if bottom sheet is not fully opened
    if(this.divBottom <= 0 && this.divBottom >= -85) return this.writeStyle(0);
  }

  private getDivBottom() {
    // the height of the view minus height of the tab-bar minus the bottom of the div
    return this.platform.height() - 57 - this.myDiv.nativeElement.getBoundingClientRect().bottom;
  }

  onMoveHandler(ev: GestureDetail) {
    let bottom: number = this.getBottom(ev.deltaY);
    this.renderer.setStyle(this.myDiv.nativeElement, '--transition-duration', '0', RendererStyleFlags2.DashCase);
    this.domCtrl.write(() => this.writeStyle(bottom) );
  }

  private writeStyle(bottom: number) {
    this.renderer.setStyle(this.dropdownBtn.nativeElement, 'rotate', `${bottom > -85 ? 180 : 0}deg`);
    this.renderer.setStyle(this.myDiv.nativeElement, 'bottom', `${bottom}px`)
  }

  private getBottom(deltaY: number) {
    let bottom = this.divBottom - deltaY;
    if (bottom > 0) return bottom = 0;
    if(bottom < -170 ) return -170;
    return bottom;
  }

  toggleBottomSheet() {1
    this.renderer.setStyle(this.myDiv.nativeElement, 'bottom', `${this.getDivBottom() < -85 ? 0 : -170}px`);
    this.renderer.setStyle(this.dropdownBtn.nativeElement, 'rotate', `${this.getBottom(0)}deg`);
  }
}
