import { SignUp } from '@clerk/nextjs'

import React from 'react'

const SignUpPage = () => {
  return <SignUp afterSignInUrl={'/new-user'} redirectUrl="/new-user" />
}

export default SignUpPage
