
export const fadeUp = {

initial: {
opacity: 0,
y: 40,
},

whileInView: {
opacity: 1,
y: 0,
},

transition: {
duration: .7,
},

viewport: {
once: true,
},

};


export const fadeLeft = {

initial: {
opacity: 0,
x: -40,
},

whileInView: {
opacity: 1,
x: 0,
},

transition: {
duration: .7,
},

viewport: {
once: true,
},

};


export const fadeRight = {

initial: {
opacity: 0,
x: 40,
},

whileInView: {
opacity: 1,
x: 0,
},

transition: {
duration: .7,
},

viewport: {
once: true,
},

};


export const scaleIn = {

initial: {
opacity: 0,
scale: .95,
},

whileInView: {
opacity: 1,
scale: 1,
},

transition: {
duration: .7,
},

viewport: {
once: true,
},

};

