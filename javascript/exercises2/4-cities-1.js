function coolCities (list) {
  return (list.map(function(n) {
    if (n.temperature < 70) {
      return n.name}
    else {return null}

  }).filter(function(n) {
    if (n != undefined) {
      return true
    }
  }))
}

var cities = [
  { name: 'Los Angeles', temperature: 60.0},
  { name: 'Atlanta', temperature: 52.0 },
  { name: 'Detroit', temperature: 48.0 },
  { name: 'New York', temperature: 80.0 }
];

console.log(coolCities(cities))
