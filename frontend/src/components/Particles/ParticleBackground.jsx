
// import { useEffect, useState } from "react";

// import Particles from "@tsparticles/react";

// import { loadSlim } from "@tsparticles/slim";

// import { tsParticles } from "@tsparticles/engine";


// function ParticleBackground(){

// const [init,setInit]=
// useState(false);


// /* =====================================
//     INIT
// ===================================== */

// useEffect(()=>{

// let mounted=true;

// const initialize=async()=>{

// await loadSlim(tsParticles);

// if(mounted){

// setInit(true);

// }

// };

// initialize();

// return()=>{

// mounted=false;

// };

// },[]);


// if(!init){

// return null;

// }


// return(

// <div
// className="
// absolute
// inset-0

// w-full
// h-full

// pointer-events-none

// overflow-hidden
// "
// >

// <Particles

// id="tsparticles"

// className="
// w-full
// h-full
// "


// options={{
//   fullScreen: {
//     enable: false,
//   },

//   background: {
//     color: {
//       value: "transparent",
//     },
//   },

//   fpsLimit: 120,

//   detectRetina: true,

//   interactivity: {
//     events: {
//       onHover: {
//         enable: true,
//         mode: "grab",
//       },

//       resize: true,
//     },

//     modes: {
//       grab: {
//         distance: 220,

//         links: {
//           opacity: 0.25,
//         },
//       },
//     },
//   },

//   particles: {
//     number: {
//       value: 90,

//       density: {
//         enable: true,
//         area: 1000,
//       },
//     },

//     color: {
//       value: [
//         "#ffffff",
//         "#fafafa",
//         "#f8fafc",
//         "#e2e8f0",
//       ],
//     },

//     shape: {
//       type: [
//         "circle",
//         "star",
//       ],
//     },

//     opacity: {
//       value: {
//         min: 0.1,
//         max: 0.9,
//       },

//       animation: {
//         enable: true,

//         speed: 1.5,

//         minimumValue: 0.1,

//         sync: false,
//       },
//     },

//     size: {
//       value: {
//         min: 1,
//         max: 4,
//       },

//       animation: {
//         enable: true,

//         speed: 2,

//         minimumValue: 1,

//         sync: false,
//       },
//     },

//     links: {
//       enable: true,

//       distance: 150,

//       color: "#ffffff",

//       opacity: 0.12,

//       width: 1,
//     },

//     move: {
//       enable: true,

//       speed: 0.8,

//       direction: "none",

//       random: true,

//       straight: false,

//       outModes: {
//         default: "out",
//       },
//     },

//     wobble: {
//       enable: true,

//       distance: 8,

//       speed: {
//         min: 1,
//         max: 3,
//       },
//     },
//   },
// }}


//  />

// </div>

// )

// }

// export default ParticleBackground


import { useEffect, useState } from "react";

import Particles from "@tsparticles/react";

import { loadSlim } from "@tsparticles/slim";

import { tsParticles } from "@tsparticles/engine";

function ParticleBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    let mounted = true;

    const initialize = async () => {
      await loadSlim(tsParticles);

      if (mounted) {
        setInit(true);
      }
    };

    initialize();

    return () => {
      mounted = false;
    };
  }, []);

  if (!init) {
    return null;
  }

  return (
    <div
      className="
      fixed
      inset-0

      w-full
      h-full

      pointer-events-none

      overflow-hidden

      z-0

      opacity-80

      mix-blend-screen
      "
    >
      <Particles
        id="tsparticles"
        className="
        w-full
        h-full
        "
        options={{
          fullScreen: {
            enable: false,
          },

          background: {
            color: {
              value: "transparent",
            },
          },

          fpsLimit: 120,

          detectRetina: true,

          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: "grab",
              },

              resize: true,
            },

            modes: {
              grab: {
                distance: 220,

                links: {
                  opacity: 0.25,
                },
              },
            },
          },

          particles: {
            number: {
              value: 40,

              density: {
                enable: true,
                area: 1000,
              },
            },

            color: {
              value: [
                "#ffffff",
                "#fafafa",
                "#f8fafc",
                "#e2e8f0",
              ],
            },

            shape: {
              type: [
                "circle",
                "triangle",
                "square",
              ],
            },

            opacity: {
              value: {
                min: 0.1,
                max: 0.9,
              },

              animation: {
                enable: true,

                speed: 1.5,

                minimumValue: 0.1,

                sync: false,
              },
            },

            size: {
              value: {
                min: 1,
                max: 4,
              },

              animation: {
                enable: true,

                speed: 2,

                minimumValue: 1,

                sync: false,
              },
            },

            links: {
              enable: true,

              distance: 220,

              color: "#ffffff",

              opacity: 0.05,

              width: 1,
            },

            move: {
              enable: true,

              speed: 0.8,

              direction: "none",

              random: true,

              straight: false,

              outModes: {
                default: "out",
              },
            },

            wobble: {
              enable: true,

              distance: 8,

              speed: {
                min: 1,
                max: 3,
              },
            },
          },
        }}
      />
    </div>
  );
}

export default ParticleBackground;
