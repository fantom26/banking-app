import type { IconName } from '@/app/_components/Icon'

// key is a Navigation message key
export const sidebarLinks: {
  icon: IconName
  route: string
  key: 'home' | 'myBanks' | 'transactionHistory' | 'transferFunds'
}[] = [
  {
    icon: 'house',
    route: '/',
    key: 'home'
  },
  {
    icon: 'circle-dollar-sign',
    route: '/my-banks',
    key: 'myBanks'
  },
  {
    icon: 'receipt-text',
    route: '/transaction-history',
    key: 'transactionHistory'
  },
  {
    icon: 'send',
    route: '/payment-transfer',
    key: 'transferFunds'
  }
]

export const transactionCategoryStyles = {
  FOOD_AND_DRINK: {
    borderColor: 'border-pink-600',
    backgroundColor: 'bg-pink-500',
    textColor: 'text-pink-700',
    chipBackgroundColor: 'bg-inherit'
  },
  BANK_FEES: {
    borderColor: 'border-success-600',
    backgroundColor: 'bg-green-600',
    textColor: 'text-success-700',
    chipBackgroundColor: 'bg-inherit'
  },
  TRANSFER_OUT: {
    borderColor: 'border-red-700',
    backgroundColor: 'bg-red-700',
    textColor: 'text-red-700',
    chipBackgroundColor: 'bg-inherit'
  },
  Processing: {
    borderColor: 'border-[#F2F4F7]',
    backgroundColor: 'bg-gray-500',
    textColor: 'text-[#344054]',
    chipBackgroundColor: 'bg-[#F2F4F7]'
  },
  Success: {
    borderColor: 'border-[#12B76A]',
    backgroundColor: 'bg-[#12B76A]',
    textColor: 'text-[#027A48]',
    chipBackgroundColor: 'bg-[#ECFDF3]'
  },
  TRAVEL: {
    borderColor: 'border-[#0047AB]',
    backgroundColor: 'bg-blue-500',
    textColor: 'text-blue-700',
    chipBackgroundColor: 'bg-[#ECFDF3]'
  },
  TRANSFER_IN: {
    borderColor: 'border-emerald-600',
    backgroundColor: 'bg-emerald-500',
    textColor: 'text-emerald-700',
    chipBackgroundColor: 'bg-inherit'
  },
  LOAN_PAYMENTS: {
    borderColor: 'border-orange-600',
    backgroundColor: 'bg-orange-500',
    textColor: 'text-orange-700',
    chipBackgroundColor: 'bg-inherit'
  },
  default: {
    borderColor: '',
    backgroundColor: 'bg-blue-500',
    textColor: 'text-blue-700',
    chipBackgroundColor: 'bg-inherit'
  }
}
