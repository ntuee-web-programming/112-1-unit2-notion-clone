import { auth } from "@/lib/auth";

async function SSRDemo() {
  const session = await auth();
  return (
    <div>
      <h1 className="text-xl">SSR Demo</h1>
      <p className="mb-4 text-lg">Server Side Rendering</p>
      <p>{JSON.stringify(session, null, 2)}</p>
    </div>
  );
}
export default SSRDemo;
