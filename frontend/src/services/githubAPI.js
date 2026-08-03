import api from "./api";


export const getGithubProfile=async()=>{

try{

const response=

await fetch(

`https://api.github.com/users/${
import.meta.env.VITE_GITHUB_USERNAME
}`

);

return await response.json();

}

catch(error){

console.log(error);

return null;

}

};



export const getRepositories=async()=>{

try{

const response=

await fetch(

`https://api.github.com/users/${
import.meta.env.VITE_GITHUB_USERNAME
}/repos`

);

return await response.json();

}

catch(error){

console.log(error);

return [];

}

};