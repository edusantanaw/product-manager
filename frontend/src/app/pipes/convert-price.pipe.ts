import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'convertPrice', pure: true })
export class ConvertPricePipe implements PipeTransform {
    transform(value: number): string {
        if (!value) return "R$ 0,00"
        return value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })
    }
}