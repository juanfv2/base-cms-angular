import {Injectable} from '@angular/core'
import {OwlDateTimeIntl} from 'ng-pick-datetime-ex'

// here is the default text string
@Injectable({
  providedIn: 'root',
})
export class JfDefaultIntlService extends OwlDateTimeIntl {
  /** A label for the up second button (used by screen readers).  */
  override upSecondLabel = '+ segundo'

  /** A label for the down second button (used by screen readers).  */
  override downSecondLabel = '- segundo'

  /** A label for the up minute button (used by screen readers).  */
  override upMinuteLabel = '+ minuto'

  /** A label for the down minute button (used by screen readers).  */
  override downMinuteLabel = '-1 minuto'

  /** A label for the up hour button (used by screen readers).  */
  override upHourLabel = '+1 hora'

  /** A label for the down hour button (used by screen readers).  */
  override downHourLabel = '-1 hora'

  /** A label for the previous month button (used by screen readers). */
  override prevMonthLabel = 'Mes anterior'

  /** A label for the next month button (used by screen readers). */
  override nextMonthLabel = 'Mes siguiente'

  /** A label for the previous year button (used by screen readers). */
  override prevYearLabel = 'Año anterior'

  /** A label for the next year button (used by screen readers). */
  override nextYearLabel = 'Año siguiente'

  /** A label for the previous multi-year button (used by screen readers). */
  override prevMultiYearLabel = 'Previous 21 years'

  /** A label for the next multi-year button (used by screen readers). */
  override nextMultiYearLabel = 'Next 21 years'

  /** A label for the 'switch to month view' button (used by screen readers). */
  override switchToMonthViewLabel = 'Change to month view'

  /** A label for the 'switch to year view' button (used by screen readers). */
  override switchToMultiYearViewLabel = 'Choose month and year'

  /** A label for the cancel button */
  override cancelBtnLabel = 'Cancelar'

  /** A label for the set button */
  override setBtnLabel = 'Aceptar'

  /** A label for the range 'from' in picker info */
  override rangeFromLabel = 'Desde'

  /** A label for the range 'to' in picker info */
  override rangeToLabel = 'Hasta'

  /** A label for the hour12 button (AM) */
  override hour12AMLabel = 'AM'

  /** A label for the hour12 button (PM) */
  override hour12PMLabel = 'PM'
}
