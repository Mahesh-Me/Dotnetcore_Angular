import {Directive, HostListener, Input} from '@angular/core';
import jQuery from 'jquery';
const $ = jQuery;

@Directive({
    selector: `[numbersonly]`
})
 
export class NumberOnlyDirective {
    @HostListener('keypress',['$event']) onkeypress(e:any) {
        let event = e || window.event;
        if (event) {
            return this.isNumberKey(event);
        }
        return;
    }
 
    isNumberKey(event: { which: any; keyCode: any; }) {
        let charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }
 
    @HostListener('click', ['$event.target']) onclick(element:any) {
        $('#' + element.id).bind('cut copy paste', function (e:any) {
            e.preventDefault(); //disable cut,copy,paste
        });
        return false;
    }
}