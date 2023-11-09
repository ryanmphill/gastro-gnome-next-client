import Home from '@/components/home/Home'

interface searchParamsProp {
  searchParams?: {
      search?: string,
      category?: string[] | string,
      following?: string
  }
}

const HomePage = ({ searchParams } : searchParamsProp ) => {
  return <>
  <Home searchParams={searchParams} />
  </>
}
export default HomePage