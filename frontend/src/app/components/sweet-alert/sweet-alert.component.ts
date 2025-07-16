import { Component, Input } from "@angular/core";
import { ModalComponent } from "../modal/modal.component";
import { CommonModule } from "@angular/common";

@Component({
    selector: "sweet-alert",
    templateUrl: "./sweet-alert.component.html",
    styleUrl: "./sweet-alert.component.css",
    standalone: true,
    imports: [ModalComponent, CommonModule]
})
export class SweetAlertComponent {
    @Input() title: string = "Sucesso"
    @Input() message: string = "Ação realizada com successo"
    @Input() success: boolean = true
    @Input({ required: true }) onConfirm!: () => void
}