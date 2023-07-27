function Background() {
  return (
    <>
      <div className="fixed -z-10 h-screen w-full bg-gradient-radial-from-tr from-red-400 to-50% opacity-40" />
      <div className="fixed -z-10 h-screen w-full bg-gradient-radial-from-bl from-blue-300 to-50% opacity-50" />
    </>
  );
}

export default Background;
