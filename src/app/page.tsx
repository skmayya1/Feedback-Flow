import { prisma } from "@/lib/utils/Prisma";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/server";

const page = async () => {
  const data = await prisma.user.findMany({})
  return (
    <div>
      <LogoutLink>Logout</LogoutLink>
      {data && data.map((user) => (
        <div key={user.id}>{user.email}</div>
      ))}
    </div>
  )
}

export default page