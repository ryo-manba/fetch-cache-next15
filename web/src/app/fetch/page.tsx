import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
const url = "http://localhost:8080/hello";

async function getHello() {
  noStore();

  // https://nextjs.org/docs/app/building-your-application/caching#request-memoization
  const res = await fetch(url);
  return await res.json();
}

async function Hello() {
  // 1
  const res = await getHello();
  return <div>{JSON.stringify(res)}</div>;
}

export default async function Page() {
  // 2
  const res = await getHello();

  return (
    <div>
      <Link href="/">Back</Link>
      <div>Page: {JSON.stringify(res)}</div>
      <Hello />
      <Hello />
      <Hello />
    </div>
  );
}
