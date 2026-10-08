'use client'

import React, { useCallback, useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import { PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink } from 'react-plaid-link'

import { createLinkToken, exchangePublicToken } from '@/lib/actions/bank.actions'

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
        <Button>Connect bank</Button>
      ) : (
        <Button>Connect bank</Button>
      )}
    </>
  )
}

export default PlaidLink
