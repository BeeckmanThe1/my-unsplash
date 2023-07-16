import Link from 'next/link'

export default function Home() {
  return (
    <ul>
      <li>
        <Link href="/pages/a" as="/a">
          a
        </Link>
      </li>
      <li>
        <Link href="/pages/b" as="/b">
          b
        </Link>
      </li>
    </ul>
  )
}
