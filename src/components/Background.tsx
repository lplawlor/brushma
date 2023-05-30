function Background() {
  return (
    <div>
      <div className="fixed -z-10 min-h-screen min-w-full bg-gradient-radial-from-tr from-red-400 to-80% opacity-40" />
      <div className="fixed -z-10 min-h-screen min-w-full bg-gradient-radial-from-bl from-blue-300 to-50% opacity-20" />
    </div>
  );
}

export default Background;
