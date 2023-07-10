import React, { type FC, useEffect, useState } from 'react'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Loader, PageState } from 'components'
import { TOOLS_API_URL } from 'config'
import { routeNames } from 'routes'
import { StatisticsLayout } from './components'

interface StatisticsType {
  currentPrice: number
  volume24h: number
}

export const Statistics: FC = () => {
  const [statistics, setStatistics] = useState<StatisticsType | null>()

  const getStatistics: () => Promise<void> = async () => {
    try {
      const { data } = await axios.get<
      Array<{
        statistics: StatisticsType
      }>
      >('/growth-api/charts', {
        baseURL: TOOLS_API_URL,
        params: {
          types: 'price'
        }
      })
      setStatistics(data[0].statistics)
    } catch (err) {
      console.error('Unable to fetch Statistics')
      setStatistics(null)
    }
  }

  useEffect(() => {
    void getStatistics()
  }, [])

  if (statistics === null) {
    return (
      <PageState
        icon={faTriangleExclamation}
        iconClass='text-white'
        iconBgClass='bg-warning'
        iconSize='3x'
        title='Unable to load statistics'
        action={<Link to={routeNames.dashboard}>Back to Dashboard</Link>}
      />
    )
  }

  if (statistics == null) {
    return (
      <StatisticsLayout>
        <Loader />
      </StatisticsLayout>
    )
  }

  return (
    <StatisticsLayout>
      <div className='row mt-3'>
        <div className='col-12'>
          <p className='ml-2'>
            Information below is fetched using{' '}
            <span className='badge badge-primary'>nativeAuth</span> Bearer token
          </p>
          <ul className='list-group text-left'>
            <li className='list-group-item'>
              Current price: {statistics.currentPrice}
            </li>
            <li className='list-group-item'>
              24h Volume: {statistics.volume24h}
            </li>
          </ul>
        </div>
      </div>
    </StatisticsLayout>
  )
}
