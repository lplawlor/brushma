/**
 * Gradient background used across the application.
 *
 * Uses the custom bg-gradient-radial-from-* classes defined in the TailwindCSS config.
 * -z-10 is used to place the gradients behind everything else.
 */
export default function Background() {
  return (
    <>
      <div className="fixed -z-10 h-full w-full bg-gradient-radial-from-tr from-red-400 to-50% opacity-40" />
      <div className="fixed -z-10 h-full w-full bg-gradient-radial-from-bl from-blue-300 to-50% opacity-50" />
    </>
  );
}
