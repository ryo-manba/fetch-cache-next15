import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
const url = "http://localhost:8080/hello";

async function getHello() {
  noStore();

  // https://nextjs.org/docs/app/building-your-application/caching#opting-out
  const { signal } = new AbortController();
  const res = await fetch(url, { signal });

  return await res.json();
}

async function getSlowHelloWithAbort() {
  noStore();

  // https://nextjs.org/docs/app/building-your-application/caching#opting-out
  const controller = new AbortController();
  setTimeout(() => {
    // Abort before response is returned
    controller.abort();
  }, 1000);
  const res = await fetch(url, { signal: controller.signal });

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

  // If this is uncommented, error will be displayed
  // const slowRes = await getSlowHelloWithAbort();

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
