
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/server";

const page = async () => {

  return (
    <div className="h-screen w-full">
      <LogoutLink>Logout</LogoutLink>
    </div>
  )
}

export default page