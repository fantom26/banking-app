import Image from 'next/image'

import { useFormatter } from 'next-intl'

import Icon from '@/app/_components/Icon'
import { Link } from '@/app/_i18n/navigation'

import Copy from './Copy'

const BankCard = ({ account, userName, showBalance }: CreditCardProps) => {
  const format = useFormatter()

  return (
    <div className='flex flex-col'>
      <Link href={`/transaction-history/?id=${account.bankRecordId}`} className='bank-card'>
        <div className='bank-card_content'>
          <div>
            <h2 className='text-16 font-semibold text-white'>{account.name || userName}</h2>
            <p className='font-bold text-white'>
              {format.number(account.currentBalance, 'currency')}
            </p>
          </div>

          <article className='flex flex-col gap-2'>
            <div className='flex justify-between'>
              <h2 className='text-12 font-semibold text-white'>{userName}</h2>
              <h3 className='text-12 font-semibold text-white'>●● / ●●</h3>
            </div>
            <p className='text-14 font-semibold tracking-[1.1px] text-white'>
              ●●●● ●●●● ●●●● <span className='text-16'>{account.mask}</span>
            </p>
          </article>
        </div>

        <div className='bank-card_icon'>
          <Icon name='nfc' className='size-6 text-white' />
          <Image
            src='/icons/mastercard.svg'
            width={45}
            height={32}
            alt='mastercard'
            className='ml-5'
          />
        </div>

        <Image
          src='/icons/lines.png'
          width={316}
          height={190}
          alt='lines'
          loading='eager'
          className='absolute top-0 left-0'
        />
      </Link>

      {showBalance && <Copy title={account.sharableId} />}
    </div>
  )
}

export default BankCard
