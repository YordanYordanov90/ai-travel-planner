import { SignUp } from '@clerk/nextjs'
import { dark } from '@clerk/themes'

export default function Page() {
  return (
  <div className='w-full h-screen flex justify-center items-center'>

    <SignUp appearance={{baseTheme: dark}} />
  </div>

)
}