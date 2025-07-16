import { Component, signal } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import 'zone.js';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, CommonModule, RouterModule],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('frontend');
  constructor(private readonly router: Router) { }

  showHeader() {
    const notShowHeaderPage = ["not-found"]
    return !notShowHeaderPage.find((v) => this.router.url.includes(v))
  }
}
