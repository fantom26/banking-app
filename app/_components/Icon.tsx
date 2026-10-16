import {
  ArrowDownLeft,
  ArrowLeft,
  ArrowLeftRight,
  ArrowRight,
  Briefcase,
  CarFront,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  CircleDollarSign,
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
  Menu,
  MoreHorizontal,
  Nfc,
  Percent,
  Plane,
  Plus,
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
  'arrow-left': ArrowLeft,
  'arrow-left-right': ArrowLeftRight,
  'arrow-right': ArrowRight,
  briefcase: Briefcase,
  'car-front': CarFront,
  check: Check,
  'chevron-down': ChevronDown,
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  'circle-check': CircleCheck,
  'circle-dollar-sign': CircleDollarSign,
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
  menu: Menu,
  nfc: Nfc,
  percent: Percent,
  plane: Plane,
  plus: Plus,
  'receipt-text': ReceiptText,
  scissors: Scissors,
  send: Send,
  shapes: Shapes,
  'shield-check': ShieldCheck,
  'shopping-bag': ShoppingBag,
  utensils: Utensils,
  wrench: Wrench,
  'more-horizontal': MoreHorizontal
} satisfies Record<string, LucideIcon>

export type IconName = keyof typeof icons

// Decorative by default; pass aria-hidden={false} plus an aria-label for a standalone icon.
const Icon = ({ name, ...props }: LucideProps & { name: IconName }) => {
  const Component = icons[name]
  return <Component aria-hidden {...props} />
}

export default Icon
