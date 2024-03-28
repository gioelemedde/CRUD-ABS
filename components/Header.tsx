import Image from "next/image";
import Link from "next/link";

function Header() {
  return (
    <header className=" flex justify-center ">
      <Link href='/'>
        <Image
          src="/logo.png"
          alt="abs logo"
          className="dark:invert hover:scale-110 transition h-auto w-auto"
          width={90}
          height={24}
          priority
        />
      </Link>
    </header>
  );
}

export default Header;
