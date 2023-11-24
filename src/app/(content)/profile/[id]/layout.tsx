export default function ProfileLayout({
    children,
    params
  }: {
    children: React.ReactNode
    params: {
        id: string
    }
  }) {
    return (
      <>
        <header>
            <h1>Shared Layout For Profile #{params.id}</h1>
        </header>
          {children}
      </>
    )
  }