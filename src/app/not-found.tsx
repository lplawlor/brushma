function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center mx-10 text-center">
      <p className="text-3xl md:text-4xl mb-4">Not Found.</p>
      <p className="text-lg md:text-xl font-light">Could not find requested resource.</p>
      <a
        className="btn-primary"
        href="/"
      >
        Return to Home
      </a>
    </div>
  );
}

export default NotFound;
