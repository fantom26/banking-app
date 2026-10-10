export const sidebarLinks = [
  {
    imgURL: '/icons/home.svg',
    route: '/',
    label: 'Home'
  },
  {
    imgURL: '/icons/dollar-circle.svg',
    route: '/my-banks',
    label: 'My Banks'
  },
  {
    imgURL: '/icons/transaction.svg',
    route: '/transaction-history',
    label: 'Transaction History'
  },
  {
    imgURL: '/icons/money-send.svg',
    route: '/payment-transfer',
    label: 'Transfer Funds'
  }
]

export const topCategoryStyles = {
  FOOD_AND_DRINK: {
    bg: 'bg-blue-25',
    circleBg: 'bg-blue-100',
    text: {
      main: 'text-blue-900',
      count: 'text-blue-700'
    },
    progress: {
      bg: 'bg-blue-100',
      indicator: 'bg-blue-700'
    }
  },
  TRAVEL: {
    bg: 'bg-success-25',
    circleBg: 'bg-success-100',
    text: {
      main: 'text-success-900',
      count: 'text-success-700'
    },
    progress: {
      bg: 'bg-success-100',
      indicator: 'bg-success-700'
    }
  },
  TRANSFER_IN: {
    bg: 'bg-emerald-50',
    circleBg: 'bg-emerald-100',
    text: {
      main: 'text-emerald-900',
      count: 'text-emerald-700'
    },
    progress: {
      bg: 'bg-emerald-100',
      indicator: 'bg-emerald-700'
    }
  },
  LOAN_PAYMENTS: {
    bg: 'bg-orange-50',
    circleBg: 'bg-orange-100',
    text: {
      main: 'text-orange-900',
      count: 'text-orange-700'
    },
    progress: {
      bg: 'bg-orange-100',
      indicator: 'bg-orange-700'
    }
  },
  default: {
    bg: 'bg-pink-25',
    circleBg: 'bg-pink-100',
    text: {
      main: 'text-pink-900',
      count: 'text-pink-700'
    },
    progress: {
      bg: 'bg-pink-100',
      indicator: 'bg-pink-700'
    }
  }
}

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
