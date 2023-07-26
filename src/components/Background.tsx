function Background() {
  return (
    <>
      <div className="fixed -z-10 h-screen w-full bg-gradient-radial-from-tl from-red-400 to-50% opacity-40" />
      <div className="fixed -z-10 h-screen w-full bg-gradient-radial-from-br from-blue-300 to-50% opacity-50" />
    </>
  );
}

export default Background;
