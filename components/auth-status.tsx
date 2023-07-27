import { getServerSession } from "next-auth/next";

export default async function AuthStatus() {
  const session = await getServerSession();
  return (
    <div className= mx-auto max-w-7xl px-6 lg:px-8 mt-4 top-5  w-full  flex justify-center items-center pb-4 border-b border-white/10 mb-6 ">
      {session && (
        <p className=" text-sm">Signed in as {session.user?.email}</p>
      )}
    </div>
  );
}
