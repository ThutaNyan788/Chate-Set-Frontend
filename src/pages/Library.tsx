import React from 'react'
import AuthenticatedLayout from '@/components/layout/AuthenticatedLayout'

const Library = () => {
  return (
    <div>
      <AuthenticatedLayout>
        <div className="container mx-auto">
          hello library
        </div>
      </AuthenticatedLayout>
    </div>
  )
}

export default Library