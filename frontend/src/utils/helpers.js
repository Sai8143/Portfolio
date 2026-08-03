
export function scrollToSection(id){

const section=
document.getElementById(id);

if(section){

section.scrollIntoView({
behavior:"smooth"
});

}

}


export function formatNumber(number){

return new Intl.NumberFormat().format(
number
);

}
