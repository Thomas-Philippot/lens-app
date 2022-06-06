import React from 'react'
import Link from 'next/link'
import { withRouter } from 'next/router'

const Tabs = ({ router }) => {
  const {
    query: { tab }
  } = router

  const isTabOne = tab === "1" || tab == null
  const isTabTwo = tab === "2"
  return (
      <div>
        <div>
          <div selected={isTabOne}>
            <Link href={{ pathname: router.pathname + router.query, query: { tab: "1"} }}>
              <a>Tab 1</a>
            </Link>
          </div>
          <div selected={isTabTwo}>
            <Link href={{ pathname: router.pathname, query: { tab: "2"} }}>
              <a>Tab 1</a>
            </Link>
          </div>
        </div>
        <div>
          {isTabOne && <React.Fragment>This is tab One</React.Fragment>}
          {isTabTwo && <React.Fragment>This is tab Two</React.Fragment>}
        </div>
      </div>
  )
}

export default withRouter(Tabs)
