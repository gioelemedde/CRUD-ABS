"use client";
function Error({ error }: { error: Error }) {
  return (
    <h1 className="text-center text-red-600 text-3xl">
      {error.message}
    </h1>
  );
}

export default Error;
