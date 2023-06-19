let tokens = [
    {
        token: '$2a$10$k1kfBo6p0PG/Z/edGdjtduFXA6Pnw.60lFTLum.s1uDx1LjELaJDa',
        time: 1687190499436
    },
    {
        token: '$2a$10$vFepQfAgmekmCA2CNAL5WObHKYftMAvGQ4.JKedhz/tkMZ2uy6.oO',
        time: 1687190715046
    },
    {
        token: '$2a$10$vFepQfAgmekmCA2CNAL5WObHKYftMAvGQ4.JKedhz/tkMZ2uy6.12',
        time: 1687190715046
    }
]

for (let element in tokens){
    console.log(tokens[element].token);
}

let token = '$2a$10$k1kfBo6p0PG/Z/edGdjtduFXA6Pnw.60lFTLum.s1uDx1LjELaJDa'

tokens = tokens.filter( element => element.token != token);

console.log(tokens);