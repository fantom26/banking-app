'use client'

import { useCallback, useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import { PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink } from 'react-plaid-link'

import { createLinkToken, exchangePublicToken } from '@/lib/actions/bank.actions'

import Icon from './Icon'
import { Button } from './ui/button'

const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
  const router = useRouter()

  const [token, setToken] = useState('')

  useEffect(() => {
    const getLinkToken = async () => {
      const data = await createLinkToken()

      setToken(data?.linkToken)
    }

    getLinkToken()
  }, [user])

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
    <>
      {variant === 'primary' ? (
        <Button onClick={() => open()} disabled={!ready} className='plaidlink-primary'>
          Connect bank
        </Button>
      ) : variant === 'ghost' ? (
        <Button onClick={() => open()} variant='ghost' className='plaidlink-ghost'>
          <Icon name='landmark' className='size-6 text-gray-500' />
          <p className='hiddenl text-[16px] font-semibold text-black-2 xl:block'>Connect bank</p>
        </Button>
      ) : (
        <Button onClick={() => open()} className='plaidlink-default'>
          <Icon name='landmark' className='size-6 text-gray-500' />
          <p className='text-[16px] font-semibold text-black-2'>Connect bank</p>
        </Button>
      )}
    </>
  )
}

export default PlaidLink
