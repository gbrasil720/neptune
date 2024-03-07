import { Button } from '@/components/ui/button'
import { AtSign } from 'lucide-react'
import Image from 'next/image'

export default function AuthPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full max-w-[350px] flex-col justify-center space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <Image
            src="/logo-light.png"
            alt="Neptune"
            className="size-24"
            width={130}
            height={130}
            draggable={false}
          />

          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">neptune</h1>
            <p className="text-sm text-muted-foreground">
              The perfect company management app that you need.
            </p>
          </div>
        </div>
        <div>
          <Button variant="outline" className="w-full">
            <AtSign size={24} className="mr-2 size-4" />
            Sign in with Google
          </Button>
        </div>
        <p className="px-10 text-center text-sm leading-relaxed text-muted-foreground">
          By clicking continue, you agree to our{' '}
          <a
            href="#"
            className="underline underline-offset-4 hover:text-primary"
            target="_blank"
            rel="noreferrer"
          >
            Terms of Service
          </a>{' '}
          and{' '}
          <a
            href="#"
            className="underline underline-offset-4 hover:text-primary"
            target="_blank"
            rel="noreferrer"
          >
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  )
}
