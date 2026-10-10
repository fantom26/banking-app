import {
  ArrowDownLeft,
  ArrowLeftRight,
  Briefcase,
  CarFront,
  CreditCard,
  Film,
  Hammer,
  HeartPulse,
  House,
  Landmark,
  type LucideIcon,
  Percent,
  Plane,
  Scissors,
  Shapes,
  ShoppingBag,
  Utensils,
  Wrench
} from 'lucide-react'

// Keys are Plaid's personal_finance_category primaries:
// https://plaid.com/documents/pfc-taxonomy-all.csv
const categoryIcons: Record<string, LucideIcon> = {
  INCOME: Briefcase,
  TRANSFER_IN: ArrowDownLeft,
  TRANSFER_OUT: ArrowLeftRight,
  LOAN_PAYMENTS: CreditCard,
  BANK_FEES: Percent,
  ENTERTAINMENT: Film,
  FOOD_AND_DRINK: Utensils,
  GENERAL_MERCHANDISE: ShoppingBag,
  HOME_IMPROVEMENT: Hammer,
  MEDICAL: HeartPulse,
  PERSONAL_CARE: Scissors,
  GENERAL_SERVICES: Wrench,
  GOVERNMENT_AND_NON_PROFIT: Landmark,
  TRANSPORTATION: CarFront,
  TRAVEL: Plane,
  RENT_AND_UTILITIES: House
}

const CategoryIcon = ({ category, className }: { category: string; className?: string }) => {
  const Icon = categoryIcons[category] ?? Shapes
  return <Icon aria-hidden className={className} />
}

export default CategoryIcon
