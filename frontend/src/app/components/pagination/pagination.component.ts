import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
  selector: "pagination-menager",
  templateUrl: "./pagination.component.html",
  styleUrl: "./pagination.component.css",
  standalone: true,
  imports: [CommonModule],
})
export class PaginationComponent {
  @Input() page: number = 0;
  @Input() totalPages: number = 1;
  @Input({ required: true }) handlePage: (page: number) => void = () => { };

  get visiblePages(): number[] {
    const pages: number[] = [];
    const range = 2;

    const start = Math.max(0, this.page - range);
    const end = Math.min(this.totalPages - 1, this.page + range);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }
}
