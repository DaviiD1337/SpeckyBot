module.exports = {
    name: "primes",
    description: "Gives you prime numbers!",
    category: "math",
    aliases: ["prime"]
}

const { writeFile, readFileSync } = require('fs');
const { join } = require('path');
const primesPath = join(__dirname,'data','primes.json');

module.exports.run = async (bot, msg) => {
    const startPrimes = [];
    const primes = [];
    let numb = 1;
    let string = "";

    try{
        startPrimes.push(...JSON.parse(readFileSync(primesPath,{encoding:'UTF8'})));
        numb = startPrimes.last() || 1;
    }catch(e){}

    async function prime(){
        numb++;
        if([...primes,...startPrimes].every(p=>numb%p)){
            primes.push(numb);
            string = primes.join(" ");
        }
        if(string.length >= 1980){
            primes.pop();
            return;
        }
        await prime();
    }
    await prime();

    writeFile(primesPath,JSON.stringify([...startPrimes,...primes]),e=>e?console.error(e):null);

    return msg.channel.send(primes.join(" "),{code:'js'})
}
