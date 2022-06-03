import { Row, ConnectButton } from 'web3uikit'
import React from 'react'

export const Navbar = () => {
  return (
      <div style={{ paddingTop: '10px'}}>
        <Row
            alignItems="center"
            justifyItems="right"
            lg={24}
            md={24}
            sm={16}
            xs={8}
        >
          <ConnectButton />
        </Row>
      </div>
  )
}
