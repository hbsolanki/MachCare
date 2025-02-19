export default function Page404() {
  return (
    <main className="grid min-h-screen place-items-center bg-white px-6 py-20 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-2xl font-bold text-blue-500 sm:text-3xl">404</p>
        <h1 className="mt-4 text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
          Oops! Page Not Found
        </h1>
        <p className="mt-6 text-lg text-gray-600 sm:text-xl">
          Sorry, the page you're looking for doesn't exist.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-6">
          <a
            href="/"
            className="rounded-md bg-blue-500 px-6 py-3 text-lg font-semibold text-white shadow-lg hover:bg-blue-600 transition duration-300"
          >
            Go Home
          </a>
          <a
            href="/contactus"
            className="text-lg font-semibold text-gray-900 hover:underline"
          >
            Contact Support &rarr;
          </a>
        </div>
      </div>
    </main>
  );
}
