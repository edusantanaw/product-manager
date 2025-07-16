import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'no-data',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './no-data.component.html',
  styleUrl: './no-data.component.css'
})
export class NoDataComponent {
  @Input() message: string = 'Nenhum dado encontrado.';
}
