import Image from "next/image";
function NotFound() {
  return (

    <div className="mt-3 flex justify-center flex-col items-center">
      <h1 className="text-center text-red-600 text-3xl ">
        Product not Found!, back to Home Page
      </h1>
      <Image
        src="/error.gif"
        alt="abs logo"
        className=" h-auto w-auto mt-10"
        width={90}
        height={24}
        priority
        unoptimized
      />
    </div>
  );
}

export default NotFound;
