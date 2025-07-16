import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PageContainerComponent } from '../../components/page-container/page-container.component';

@Component({
    selector: 'app-not-found',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './not-found.component.html',
    styleUrl: './not-found.component.css',
})
export class NotFoundComponent { }
