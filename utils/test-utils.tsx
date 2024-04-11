import React, { ReactNode } from 'react'
import {render} from '@testing-library/react'

const AllTheProviders = (children: ReactNode) => {
  return (
    <>
      {children}
    </>
  )
}

const customRender = (ui: any, options?: any) =>
  render(ui, {wrapper: AllTheProviders, ...options})

// re-export everything
export * from '@testing-library/react'

// override render method
export {customRender as render}