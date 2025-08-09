import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/u/_layout/wallet/_layout/pay/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/u/_layout/wallet/_layout/pay/"!</div>
}
