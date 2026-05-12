import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const buttonVariants = cva(
  'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-cobalt hover:bg-cobalt-hover text-white focus-visible:ring-cobalt',
        ember: 'bg-ember hover:bg-ember-hover text-white focus-visible:ring-ember',
        ghost: 'border border-cobalt text-cobalt hover:bg-cobalt hover:text-white focus-visible:ring-cobalt',
      },
      size: {
        sm: 'text-sm px-4 py-2',
        md: 'text-sm px-5 py-2.5',
        lg: 'text-base px-8 py-4',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

type ButtonBaseProps = VariantProps<typeof buttonVariants> & {
  className?: string
  children: React.ReactNode
}

type ButtonAsButton = ButtonBaseProps & {
  href?: undefined
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  type?: 'button' | 'submit' | 'reset'
}

type ButtonAsLink = ButtonBaseProps & {
  href: string
  onClick?: undefined
  type?: undefined
}

type ButtonProps = ButtonAsButton | ButtonAsLink

export function Button({ variant, size, className, children, href, ...props }: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className)

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button
      className={classes}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  )
}
