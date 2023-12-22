import { NavBar } from '@/components/nav/NavBar'

export default function ContentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
        <header>
          <nav>
            <NavBar />
          </nav>
        </header>
        <main>
          {children}
        </main>
        <footer></footer>
    </>
  )
}