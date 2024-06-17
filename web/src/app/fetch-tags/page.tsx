import { revalidateTag } from "next/cache";
import Link from "next/link";

const url = "http://localhost:8080/hello";

// https://rc.nextjs.org/docs/app/api-reference/functions/fetch#optionscache
async function getHelloWithTags() {
  const res = await fetch(url, {
    next: { tags: ["fetch-tag"] },
  });
  return await res.json();
}

async function Hello() {
  // 1
  const res = await getHelloWithTags();
  return <div>{JSON.stringify(res)}</div>;
}

export default async function FetchPage() {
  async function action() {
    "use server";
    console.log("revalidateTag called");
    revalidateTag("fetch-tag");
  }

  // 2
  const res = await getHelloWithTags();

  return (
    <div>
      <Link href="/">Back</Link>
      <form action={action}>
        <button type="submit">Revalidate</button>
      </form>
      <div>Page: {JSON.stringify(res)}</div>
      <Hello />
      <Hello />
      <Hello />
    </div>
  );
}
