interface IDay {
  weekday: number;
  label: string;
}

const weekDays: Array<IDay> = [
  {
    weekday: 1,
    label: 'calendar-monday'
  },
  {
    weekday: 2,
    label: 'calendar-tuesday'
  },
  {
    weekday: 3,
    label: 'calendar-wednesday'
  },
  {
    weekday: 4,
    label: 'calendar-thursday'
  },
  {
    weekday: 5,
    label: 'calendar-friday'
  },
  {
    weekday: 6,
    label: 'calendar-saturday'
  },
  {
    weekday: 7,
    label: 'calendar-sunday'
  }
]

export default weekDays;

export function convertDayToNumber(day: string): number {
  switch (day.toUpperCase()) {
    case 'LUNES':
      return 1;
    case 'MARTES':
      return 2;
    case 'MIERCOLES':
      return 3;
    case 'JUEVES':
      return 4;
    case 'VIERNES':
      return 5;
    case 'SABADO':
      return 6;
    case 'DOMINGO':
      return 7;
    default:
      return 0;
  }
}

export function convertNumberToDay(day: number) {
  switch (day) {
    case 1:
      return 'LUNES';
    case 2:
      return 'MARTES';
    case 3:
      return 'MIERCOLES';
    case 4:
      return 'JUEVES';
    case 5:
      return 'VIERNES';
    case 6:
      return 'SABADO';
    case 7:
      return 'DOMINGO';
    default:
      return '';
  }

}