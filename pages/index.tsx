import Link from 'next/link'

export default function Home() {
  return (
    <>
      <div>
        <Link href={'/blog'}>blog</Link>
      </div>
    </>
  )
}
