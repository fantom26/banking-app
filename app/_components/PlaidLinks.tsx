'use client'

import { useCallback, useEffect, useState } from 'react'

import { useLocale, useTranslations } from 'next-intl'
import { PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink } from 'react-plaid-link'

import { Button } from '@/app/_components/ui/button'
import { useRouter } from '@/app/_i18n/navigation'
import { createLinkToken, exchangePublicToken } from '@/app/_lib/actions/bank.actions'

import Icon from './Icon'

const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
  const router = useRouter()
  const t = useTranslations('PlaidLink')
  const locale = useLocale()

  const [token, setToken] = useState('')

  useEffect(() => {
    const getLinkToken = async () => {
      const data = await createLinkToken(locale)

      setToken(data?.linkToken)
    }

    getLinkToken()
  }, [user, locale])

  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (publicToken: string | null) => {
      if (publicToken) {
        await exchangePublicToken({ publicToken })

        router.push('/')
      }
    },
    [router]
  )

  const config: PlaidLinkOptions = {
    token,
    onSuccess
  }

  const { open, ready } = usePlaidLink(config)

  return variant === 'primary' ? (
    <Button onClick={() => open()} disabled={!ready} className='plaidlink-primary'>
      {t('connectBank')}
    </Button>
  ) : (
    <Button onClick={() => open()} className='plaidlink-default max-xl:justify-center!'>
      <Icon name='landmark' className='size-6 text-gray-500' />
      <p className='text-[16px] font-semibold text-black-2 max-xl:hidden'>{t('connectBank')}</p>
    </Button>
  )
}

export default PlaidLink
