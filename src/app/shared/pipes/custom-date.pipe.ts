import { Pipe } from "@angular/core";

@Pipe({
    standalone: true,
    name: 'customDate',
})
export class CustomDatePipe {
    transform(value: Date) {
        return value
    }
}