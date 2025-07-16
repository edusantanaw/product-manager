import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      class="btn"
      [disabled]="disabled"
      (click)="handleClick()"
      [type]="btnType"
      [ngClass]="[type, customClass]"
    >
      <span
        *ngIf="icon"
        class="material-symbols-outlined icon"
        aria-hidden="true"
      >
        {{ icon }}
      </span>
      <span>{{ label }}</span>
    </button>
  `,
  styleUrls: ['./app-button.component.css'],
})
export class AppButtonComponent {
  @Input() label: string = 'Enter';
  @Input() icon?: string;
  @Input() type: 'primary' | 'secondary' | 'danger' = 'primary';
  @Input() disabled: boolean = false;
  @Input() onClick: () => void = () => { };
  @Input() btnType: "button" | "submit" = "button"
  @Input() customClass: string = '';


  handleClick() {
    if (!this.disabled && this.onClick) this.onClick();
  }
}
