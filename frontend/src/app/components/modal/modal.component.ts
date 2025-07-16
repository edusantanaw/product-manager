import { Component, Input } from "@angular/core";

@Component({
    selector: "modal",
    templateUrl: "./modal.component.html",
    styleUrl: "./modal.component.css",
    standalone: true
})
export class ModalComponent {
    @Input() onClose: () => void = () => {}
}