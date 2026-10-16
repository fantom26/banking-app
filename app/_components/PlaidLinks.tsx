'use client'

import { useCallback, useEffect, useState } from 'react'

import { useLocale, useTranslations } from 'next-intl'
import { PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink } from 'react-plaid-link'

import { Button } from '@/app/_components/ui/button'
import { useRouter } from '@/app/_i18n/navigation'
import { createLinkToken, exchangePublicToken } from '@/app/_lib/actions/bank.actions'

import Icon from './Icon'

type PlaidLinkProps = Omit<React.ComponentProps<typeof Button>, 'onClick' | 'disabled'> & {
  user: User
}

const PlaidLink = ({ user, children, ...buttonProps }: PlaidLinkProps) => {
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

  return (
    <Button {...buttonProps} onClick={() => open()} disabled={!ready}>
      {children ?? (
        <>
          <Icon name='link' />
          {t('linkBank')}
        </>
      )}
    </Button>
  )
}

export default PlaidLink
