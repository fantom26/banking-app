import {
  ArrowDownLeft,
  ArrowLeftRight,
  Briefcase,
  CarFront,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  Film,
  Hammer,
  Hash,
  HeartPulse,
  House,
  Landmark,
  Languages,
  LayoutGrid,
  Link,
  LoaderCircle,
  LogOut,
  type LucideIcon,
  type LucideProps,
  Nfc,
  Percent,
  Plane,
  ReceiptText,
  Scissors,
  Send,
  Shapes,
  ShieldCheck,
  ShoppingBag,
  Utensils,
  Wrench
} from 'lucide-react'

// Lucide is tree-shaken by named import, so only the icons registered here reach the bundle.
// To use a new icon anywhere, import it above and add it to this map.
const icons = {
  'arrow-down-left': ArrowDownLeft,
  'arrow-left-right': ArrowLeftRight,
  briefcase: Briefcase,
  'car-front': CarFront,
  check: Check,
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  copy: Copy,
  'credit-card': CreditCard,
  film: Film,
  hammer: Hammer,
  hash: Hash,
  'heart-pulse': HeartPulse,
  house: House,
  landmark: Landmark,
  languages: Languages,
  'layout-grid': LayoutGrid,
  link: Link,
  loader: LoaderCircle,
  'log-out': LogOut,
  nfc: Nfc,
  percent: Percent,
  plane: Plane,
  'receipt-text': ReceiptText,
  scissors: Scissors,
  send: Send,
  shapes: Shapes,
  'shield-check': ShieldCheck,
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
