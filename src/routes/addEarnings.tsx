import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/addEarnings')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/addEarnings"!</div>
}
