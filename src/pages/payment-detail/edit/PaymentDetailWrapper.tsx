import React from 'react'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import PaymentDetail from './PaymentDetail'

const PaymentDetailWrapper = () => {
  return (
   <>
    <SideNavLayout>
      <PaymentDetail/>
    </SideNavLayout>
   </>
  )
}

export default PaymentDetailWrapper