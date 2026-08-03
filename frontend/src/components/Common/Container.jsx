
function Container({
  children,
  className = "",
}) {
  return (
    <div
      className={`
      max-w-[1400px]
      mx-auto

      px-6
      lg:px-10

      w-full

      ${className}
      `}
    >
      {children}
    </div>
  );
}

export default Container;
