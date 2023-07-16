import Link from 'next/link'

export const Home = () => {
  return (
    <ul>
      <li>
        <Link href="/pages/a/index" as="/a">
          a
        </Link>
      </li>
      <li>
        <Link href="/pages/b/index" as="/b">
          b
        </Link>
      </li>
    </ul>
  )
}

export default Home
