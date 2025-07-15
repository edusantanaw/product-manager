import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { FormsModule } from '@angular/forms';

@Component({
    selector: "header-layout",
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
    imports: [RouterModule, FormsModule]
})
export class HeaderComponent implements OnInit {
    search: string = ""
    constructor(private readonly router: Router, private readonly route: ActivatedRoute) { }
    ngOnInit(): void {
        this.route.queryParamMap.subscribe(params => {
            this.search = params.get('search') ?? '';
            this.handleSearch()
        });
    }

    handleSearch() {
        if (this.search) {
            this.router.navigateByUrl(`?search=${this.search}`)
        }
    }

    handleHome() {
        this.router.navigateByUrl("/")
    }
}