// @ts-check
import { useEffect } from 'react'
import { useQuery } from '@apollo/client'

import { allProfiles } from '@services/queries/webhook'

import { useWebhookStore } from '@store/useWebhookStore'

/**
 * @template {import('@store/useWebhookStore').WebhookStore['category']} T
 * @param {T} category */
export function useSyncData(category) {
  const cached = useWebhookStore((s) => s[category])

  const { data, loading } = useQuery(allProfiles, {
    fetchPolicy: 'no-cache',
    variables: {
      category,
      status: 'GET',
    },
  })

  useEffect(() => {
    if (data?.webhook?.[category]) {
      useWebhookStore.setState({
        [category]: data.webhook[category],
      })
    }
  }, [data])
  return { data: cached, loading }
}
