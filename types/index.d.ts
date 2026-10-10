declare type SearchParamProps = {
  params: { [key: string]: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

// ========================================

declare type User = {
  id: string
  email: string
  firstName: string
  lastName: string
  address1: string | null
  city: string | null
  state: string | null
  postalCode: string | null
  dateOfBirth: string | null
  dwollaCustomerId: string | null
  dwollaCustomerUrl: string | null
}

declare type NewUserParams = {
  userId: string
  email: string
  name: string
  password: string
}

declare type Account = {
  id: string
  availableBalance: number
  currentBalance: number
  officialName: string | null
  mask: string
  institutionId: string
  name: string
  type: string
  subtype: string
  bankRecordId: string
  sharableId: string
}

declare type Transaction = {
  id: string
  name: string
  paymentChannel: string
  type: string
  accountId: string
  amount: number
  pending: boolean
  category: string
  date: string
  image: string | null
  // Set only for transfers between users (stored in the database, not Plaid)
  channel?: string
  senderBankId?: string
  receiverBankId?: string
}

declare type Bank = {
  id: string
  userId: string
  bankId: string // Plaid item_id
  accountId: string // Plaid account_id
  accessToken: string
  fundingSourceUrl: string
  sharableId: string
}

declare type AccountTypes = 'depository' | 'credit' | 'loan ' | 'investment' | 'other'

declare type CategoryCount = {
  name: string
  count: number
  totalCount: number
}

declare type Receiver = {
  firstName: string
  lastName: string
}

declare type TransferParams = {
  sourceFundingSourceUrl: string
  destinationFundingSourceUrl: string
  amount: string
}

declare type AddFundingSourceParams = {
  dwollaCustomerId: string
  processorToken: string
  bankName: string
}

declare type NewDwollaCustomerParams = {
  firstName: string
  lastName: string
  email: string
  type: string
  address1: string
  city: string
  state: string
  postalCode: string
  dateOfBirth: string
  ssn: string
}

declare interface CreditCardProps {
  account: Account
  userName: string
  showBalance?: boolean
}

declare interface BankInfoProps {
  account: Account
  isActive: boolean
  type: 'full' | 'card'
}

declare interface HeaderBoxProps {
  title: string | React.ReactNode
  subtext: string
}

declare interface MobileNavProps {
  user: User
}

declare interface PageHeaderProps {
  topTitle: string
  bottomTitle: string
  topDescription: string
  bottomDescription: string
  connectBank?: boolean
}

declare interface PaginationProps {
  page: number
  totalPages: number
}

declare interface PlaidLinkProps {
  user: User
  variant?: 'primary' | 'ghost'
  dwollaCustomerId?: string
}

// declare type User = sdk.Models.Document & {
//   accountId: string;
//   email: string;
//   name: string;
//   items: string[];
//   accessToken: string;
//   image: string;
// };

declare interface AuthFormProps {
  type: 'sign-in' | 'sign-up'
}

declare interface BankDropdownProps {
  accounts: Account[]
  setValue?: UseFormSetValue<unknown>
  otherStyles?: string
}

declare interface BankTabItemProps {
  account: Account
  isActive: boolean
}

declare interface TotalBalanceBoxProps {
  accounts: Account[]
  totalBanks: number
  totalCurrentBalance: number
}

declare interface FooterProps {
  user: User
  type?: 'mobile' | 'desktop'
}

declare interface RightSidebarProps {
  user: User
  transactions: Transaction[]
  banks: Account[]
}

declare interface SiderbarProps {
  user: User
}

declare interface RecentTransactionsProps {
  accounts: Account[]
  transactions: Transaction[]
  bankRecordId: string
  page: number
}

declare interface TransactionHistoryTableProps {
  transactions: Transaction[]
  page: number
}

declare interface CategoryBadgeProps {
  category: string
}

declare interface TransactionTableProps {
  transactions: Transaction[]
}

declare interface CategoryProps {
  category: CategoryCount
}

declare interface PaymentTransferFormProps {
  accounts: Account[]
}

// Actions
declare interface getAccountsProps {
  userId: string
}

declare interface getAccountProps {
  bankRecordId: string
  userId: string
}

declare interface getInstitutionProps {
  institutionId: string
}

declare interface getTransactionsProps {
  accessToken: string
}

declare interface CreateFundingSourceOptions {
  customerId: string // Dwolla Customer ID
  fundingSourceName: string // Dwolla Funding Source Name
  plaidToken: string // Plaid Account Processor Token
  _links: object // Dwolla On Demand Authorization Link
}

declare interface CreateTransactionProps {
  name: string
  amount: number
  email: string
  senderId: string
  senderBankId: string
  receiverId: string
  receiverBankId: string
  transferUrl: string
}

declare interface getTransactionsByBankIdProps {
  bankId: string // banks.id
  accountId: string // Plaid account_id, copied onto each transaction
}

declare interface getUserInfoProps {
  userId: string
}

declare interface exchangePublicTokenProps {
  publicToken: string
}

declare interface createBankAccountProps {
  accessToken: string
  userId: string
  accountId: string
  bankId: string
  fundingSourceUrl: string
  sharableId: string
}

declare interface getBanksProps {
  userId: string
}

declare interface getBankProps {
  bankRecordId: string
  userId: string
}

declare interface getBankBySharableIdProps {
  sharableId: string
}
