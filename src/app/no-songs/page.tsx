async function Page() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center mx-10 text-center">
      <p className="text-3xl md:text-4xl mb-4">No tracks found.</p>
      <p className="text-lg md:text-xl font-light">Looks like you don&apos;t have any tracks in your library in the given time range.</p>
      <p className="text-lg md:text-xl font-light">Try selecting a wider range.</p>
      <a
        className="btn-primary"
        href="/in"
      >
        Return to Selection
      </a>
    </div>
  );
}

export default Page;
