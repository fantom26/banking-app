import { useCallback } from 'react'

import { useFormatter } from 'next-intl'
import CountUp from 'react-countup'

const AnimatedCounter = ({ amount }: { amount: number }) => {
  const format = useFormatter()
  const formatCurrency = useCallback((value: number) => format.number(value, 'currency'), [format])

  return <CountUp decimals={2} end={amount} formattingFn={formatCurrency} />
}

export default AnimatedCounter
