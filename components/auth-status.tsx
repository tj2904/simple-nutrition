import { getServerSession } from "next-auth/next";

export default async function AuthStatus() {
  const session = await getServerSession();
  return (
    <div className="absolute top-5 w-full flex justify-center items-center pb-4 border-b border-b-slate-300  mb-6 ">
      {session && (
        <p className=" text-sm">Signed in as {session.user?.email}</p>
      )}
    </div>
  );
}
