type CurrencyT = {
  buy: number
  buy_state: CurrencyCourseE
  currency: string
  sell: number
  sell_state: CurrencyCourseE
}

enum CurrencyCourseE {
  DOWN='DOWN',
  UP='UP'
}

type CurrencyData = {
  currencies: CurrencyT[]
  request_time: Date
  time: Date
}
export type CurrencyResponseApi = {
  data: CurrencyData
  message: string
  success: boolean
}
