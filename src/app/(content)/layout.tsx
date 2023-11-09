import { NavBar } from '@/components/nav/NavBar'

export default function ContentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
        <NavBar />
        {children}
    </>
  )
}