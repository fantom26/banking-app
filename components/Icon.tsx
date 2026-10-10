import {
  ArrowDownLeft,
  ArrowLeft,
  ArrowLeftRight,
  ArrowRight,
  Briefcase,
  CarFront,
  CircleDollarSign,
  CreditCard,
  Film,
  Hammer,
  HeartPulse,
  House,
  Landmark,
  LoaderCircle,
  LogOut,
  type LucideIcon,
  type LucideProps,
  Menu,
  Nfc,
  Percent,
  Plane,
  Plus,
  ReceiptText,
  Scissors,
  Send,
  Shapes,
  ShoppingBag,
  Utensils,
  Wrench
} from 'lucide-react'

// Lucide is tree-shaken by named import, so only the icons registered here reach the bundle.
// To use a new icon anywhere, import it above and add it to this map.
const icons = {
  'arrow-down-left': ArrowDownLeft,
  'arrow-left': ArrowLeft,
  'arrow-left-right': ArrowLeftRight,
  'arrow-right': ArrowRight,
  briefcase: Briefcase,
  'car-front': CarFront,
  'circle-dollar-sign': CircleDollarSign,
  'credit-card': CreditCard,
  film: Film,
  hammer: Hammer,
  'heart-pulse': HeartPulse,
  house: House,
  landmark: Landmark,
  loader: LoaderCircle,
  'log-out': LogOut,
  menu: Menu,
  nfc: Nfc,
  percent: Percent,
  plane: Plane,
  plus: Plus,
  'receipt-text': ReceiptText,
  scissors: Scissors,
  send: Send,
  shapes: Shapes,
  'shopping-bag': ShoppingBag,
  utensils: Utensils,
  wrench: Wrench
} satisfies Record<string, LucideIcon>

export type IconName = keyof typeof icons

// Decorative by default; pass aria-hidden={false} plus an aria-label for a standalone icon.
const Icon = ({ name, ...props }: LucideProps & { name: IconName }) => {
  const Component = icons[name]
  return <Component aria-hidden {...props} />
}

export default Icon
