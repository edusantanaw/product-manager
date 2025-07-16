import { CommonModule } from "@angular/common";
import { Component, Input, OnDestroy, OnInit, SecurityContext } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import { Editor, NgxEditorComponent, NgxEditorMenuComponent } from 'ngx-editor';
import { ProductService } from "../../services/product.service";
import { ModalComponent } from "../modal/modal.component";
import { SweetAlertComponent } from "../sweet-alert/sweet-alert.component";
import { AppButtonComponent } from "../app-button/app-button.component";

@Component({
    selector: "new-product",
    templateUrl: "./new-product.component.html",
    styleUrl: "./new-product.component.css",
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        NgxEditorComponent,
        NgxEditorMenuComponent,
        ModalComponent,
        SweetAlertComponent,
        AppButtonComponent
    ],
})
export class NewProductComponent implements OnInit, OnDestroy {
    @Input({ required: true }) handleshow: () => void = () => { };
    @Input({ required: true }) handleSuccess: () => void = () => { };

    editor!: Editor;
    productForm: FormGroup;
    imagePreview: string | null = null;
    selectedImage: File | null = null;
    confirmModal: boolean = false;
    errorAlert: boolean = false;
    errorMessage: string = ""
    createRunning: boolean = false

    constructor(
        private fb: FormBuilder,
        private productService: ProductService,
        private sanitizer: DomSanitizer
    ) {
        this.productForm = this.fb.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            price: ['', [Validators.required, Validators.min(0)]],
            image: [''],
        });
    }

    ngOnInit(): void {
        this.editor = new Editor();
    }

    ngOnDestroy(): void {
        this.editor.destroy();
    }

    onFileSelected(event: Event) {
        const file = (event.target as HTMLInputElement)?.files?.[0];
        if (file) {
            this.selectedImage = file;
            const reader = new FileReader();
            reader.onload = () => {
                this.imagePreview = reader.result as string;
            };
            reader.readAsDataURL(file);
        }
    }

    onCloseModal() {
        // not close the modal if there is a filled field
        const values = this.productForm.value
        for (const key in values) {
            if (values[key].length > 0) return
        }
        this.handleshow()
    }

    onConfirm() {
        this.confirmModal = false
        this.handleSuccess();
        this.handleshow();
    }

    onConfirmError() {
        this.errorAlert = false;
        this.errorMessage = ""
    }

    async onSubmit() {
        this.createRunning = true
        if (this.productForm.invalid) return;
        const description: string = this.productForm.value.description
        const parsed = this.sanitizer.sanitize(SecurityContext.HTML, description)
        const formData = new FormData();
        formData.append("name", this.productForm.value.name);
        formData.append("price", this.productForm.value.price);
        formData.append("description", parsed ?? "");
        if (this.selectedImage) {
            formData.append("image", this.selectedImage);
        }
        this.productService.createProduct(formData).subscribe({
            next: () => {
                this.confirmModal = true
                this.createRunning = false
            },
            error: (err) => {
                const { error: { errors } } = err as { error: { errors: string[] } }
                this.errorMessage = errors[0]
                this.errorAlert = true
                this.createRunning = false
            }
        });
    }
}
