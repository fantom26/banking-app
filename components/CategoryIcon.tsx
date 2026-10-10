import Icon, { type IconName } from './Icon'

// Keys are Plaid's personal_finance_category primaries:
// https://plaid.com/documents/pfc-taxonomy-all.csv
const categoryIcons: Record<string, IconName> = {
  INCOME: 'briefcase',
  TRANSFER_IN: 'arrow-down-left',
  TRANSFER_OUT: 'arrow-left-right',
  LOAN_PAYMENTS: 'credit-card',
  BANK_FEES: 'percent',
  ENTERTAINMENT: 'film',
  FOOD_AND_DRINK: 'utensils',
  GENERAL_MERCHANDISE: 'shopping-bag',
  HOME_IMPROVEMENT: 'hammer',
  MEDICAL: 'heart-pulse',
  PERSONAL_CARE: 'scissors',
  GENERAL_SERVICES: 'wrench',
  GOVERNMENT_AND_NON_PROFIT: 'landmark',
  TRANSPORTATION: 'car-front',
  TRAVEL: 'plane',
  RENT_AND_UTILITIES: 'house'
}

const CategoryIcon = ({ category, className }: { category: string; className?: string }) => (
  <Icon name={categoryIcons[category] ?? 'shapes'} className={className} />
)

export default CategoryIcon
