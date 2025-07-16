import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";

@Component({
    selector: "header-layout",
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
    imports: [RouterModule, FormsModule, CommonModule]
})
export class HeaderComponent implements OnInit {
    search: string = ""
    pages: { name: string, route: string }[] = [{ name: "Produtos", route: "" }, { name: "Gerenciamento", route: "management" }]
    constructor(private readonly router: Router, private readonly route: ActivatedRoute) { }
    ngOnInit(): void {
        this.route.queryParamMap.subscribe(params => {
            this.search = params.get('search') ?? '';
        });
    }

    isCurrentPage(pageRoute: string) {
        if (pageRoute === "" && this.router.url.length > 1) return false
        return this.router.url.includes(pageRoute)
    }

    handleSearch() {
        if (this.search.trim().length > 0) {
            this.router.navigateByUrl(`?search=${this.search}`)
        }
    }

    handleHome() {
        this.router.navigateByUrl("/")
    }

    handleNavigate(route: string) {
        this.router.navigateByUrl(route)
    }
}