import type { IconName } from '@/app/_components/Icon'

// key is a Navigation message key
export const sidebarLinks: {
  icon: IconName
  route: string
  key: 'home' | 'myBanks' | 'transactionHistory' | 'transferFunds'
}[] = [
  {
    icon: 'layout-grid',
    route: '/',
    key: 'home'
  },
  {
    icon: 'landmark',
    route: '/my-banks',
    key: 'myBanks'
  },
  {
    icon: 'receipt-text',
    route: '/transaction-history',
    key: 'transactionHistory'
  },
  {
    icon: 'arrow-left-right',
    route: '/payment-transfer',
    key: 'transferFunds'
  }
]
