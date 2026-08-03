
// function Button({
//   children,
//   primary = false,
//   className = "",
//   ...props
// }) {
//   return (
//     <button
//       className={
//         primary
//           ? `
//           h-[58px]
//           px-7
//           rounded-2xl
//           bg-white
//           text-black
//           font-semibold
//           flex
//           items-center
//           justify-center
//           gap-3
//           transition-all
//           duration-300
//           hover:scale-[1.02]
//           ${className}
//           `
//           : `
//           h-[58px]
//           px-7
//           rounded-2xl
//           border
//           border-white/10
//           bg-white/[0.03]
//           text-white
//           flex
//           items-center
//           justify-center
//           gap-3
//           transition-all
//           duration-300
//           hover:bg-white/[0.06]
//           ${className}
//           `
//       }
//       {...props}
//     >
//       {children}
//     </button>
//   );
// }

// export default Button;


function Button({
  children,
  primary = false,
  className = "",
  ...props
}) {
  return (
    <button
      className={
        primary
          ? `
          h-[60px]

          px-8

          rounded-[18px]

          bg-white

          text-black

          font-semibold

          flex
          items-center
          justify-center

          gap-3

          transition-all
          duration-300

          hover:-translate-y-1

          ${className}
          `
          : `
          h-[60px]

          px-8

          rounded-[18px]

          border
          border-white/[0.08]

          bg-white/[0.03]

          text-white

          flex
          items-center
          justify-center

          gap-3

          transition-all
          duration-300

          hover:bg-white/[0.06]

          ${className}
          `
      }
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
