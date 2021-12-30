import {Component, TemplateRef} from '@angular/core'
import {JfMessageService} from '../../services/jf-message.service'

@Component({
  selector: 'base-cms-toast-container',
  templateUrl: './toast-container.component.html',
  styleUrls: ['./toast-container.component.scss'],
  host: {'[class.ngb-toasts]': 'true'},
})
export class ToastContainerComponent {
  constructor(public messageService: JfMessageService) {}

  isTemplate(toast: any) {
    return toast.textOrTpl instanceof TemplateRef
  }
}
