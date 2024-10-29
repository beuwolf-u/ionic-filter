import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {
  AnimationController,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonIcon
} from "@ionic/angular/standalone";
import {addIcons} from "ionicons";
import {chevronDownOutline} from "ionicons/icons";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'syntropy-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  animations: [
    trigger('slideToggle', [
      state('collapsed', style({height: '0px', overflow: 'hidden', opacity: 0})),
      state('expanded', style({height: '*', opacity: 1})),
      transition('collapsed <=> expanded', [
        animate('300ms ease-in-out')
      ]),
    ])
  ],
  imports: [
    IonCard,
    IonCardHeader,
    IonButton,
    IonIcon,
    IonCardContent
  ],
  standalone: true
})
export class FilterComponent {

  @Output() search = new EventEmitter<void>();

  isCollapsed = true;

  constructor(private readonly animationCtrl: AnimationController) {
    addIcons({
      'chevron-down-outline': chevronDownOutline
    })
  }

  toggle(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  onSubmit() {
    this.search.emit();
  }
}
