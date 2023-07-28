import { getServerSession } from "next-auth/next";

export default async function AuthStatus() {
  const session = await getServerSession();
  return (
    <>
      {session && (
        <div className="mx-auto max-w-7xl px-6 pt-6  lg:px-8">
          <div className="border-b border-white/10 pb-4   ">
            <div className=" text-sm text-center">
              Signed in as {session.user?.email}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
