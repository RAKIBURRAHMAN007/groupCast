import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F9FBFF] text-gray-800 px-4">
      <h1 className="text-[120px] md:text-[200px] font-bold text-[#23a2fc]">
        404
      </h1>
      <h2 className="text-2xl md:text-4xl font-semibold mt-4">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-600 mt-2 text-center max-w-md">
        The page you are looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-[#23a2fc] text-white rounded-lg hover:bg-blue-500 transition-colors"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
