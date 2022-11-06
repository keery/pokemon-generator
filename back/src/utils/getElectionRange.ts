import startOfWeek from 'date-fns/startOfWeek'
import endOfWeek from 'date-fns/endOfWeek'
import format from 'date-fns/format'
import addDays from 'date-fns/addDays'

export const getElectionRange = () => {
  const date = new Date()
  const start = format(startOfWeek(date, { weekStartsOn: 1 }), 'yyyy-MM-dd')
  const end = format(
    addDays(endOfWeek(date, { weekStartsOn: 1 }), 1),
    'yyyy-MM-dd',
  )

  return { start, end }
}
