function sumPrimes(num) {
  let primes = [2];
  for (let i = 2; i <= num; i++) {
    let checks = [];
    primes.forEach((divisible) => {
      i % divisible === 0 ? checks.push("bad") : checks.push("good");
    });
    checks.every((check) => check === "good") ? primes.push(i) : false;
  }
  return primes.reduce((acc, index) => (acc += index), 0);
}

sumPrimes(10);
