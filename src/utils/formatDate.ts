import moment from 'moment'
import 'moment/locale/pt-br'

moment.locale('pt-br')

export function ShortDataFormat(data: string) {
  return moment(data).format('DD/MM/YYYY')
}
