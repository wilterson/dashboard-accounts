import Navbar from "./navbar";

export default async function Nav() {
  const session = {
    user: {
      id: 1,
      name: 'John Doe',
      email: 'johndoe@example.com',
    }
  }

  return <Navbar user={session?.user} />;
}
