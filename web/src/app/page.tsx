import Link from "next/link";
export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-4">
      <Link className="text-xl" href="/fetch">
        Fetch
      </Link>
      <Link className="text-xl" href="/react-cache">
        React Cache
      </Link>
      <Link className="text-xl" href="/unstable-cache">
        Next Unstable Cache
      </Link>
      <Link className="text-xl" href="/fetch-tags">
        Fetch With Tags
      </Link>
    </div>
  );
}
