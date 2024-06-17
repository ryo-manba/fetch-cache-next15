import { unstable_cache as cache } from "next/cache";
import { revalidateTag } from "next/cache";
import Link from "next/link";

const url = "http://localhost:8080/hello";

async function getHello() {
  const res = await fetch(url);
  return await res.json();
}

// https://nextjs.org/docs/app/api-reference/functions/unstable_cache
const getCachedHello = cache(getHello, ["hello-tag"], { tags: ["hello-tag"] });

async function Hello() {
  // 1
  const res = await getCachedHello();
  return <div>{JSON.stringify(res)}</div>;
}

export default async function FetchPage() {
  async function action() {
    "use server";
    console.log("revalidateTag called");
    revalidateTag("hello-tag");
  }

  // 2
  const res = await getCachedHello();

  return (
    <div>
      <Link href="/">Back</Link>
      <form action={action}>
        <button type="submit">Revalidate</button>
      </form>
      <div>Page: cached: {JSON.stringify(res)}</div>
      <Hello />
      <Hello />
      <Hello />
    </div>
  );
}
