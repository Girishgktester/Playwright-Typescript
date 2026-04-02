type Machine = {
  name: string;
  capacity: number;
  files: string[];
};

const files: string[] = [
  'tests/login.spec.ts',
  'tests/search.spec.ts',
  'tests/cart.spec.ts',
  'tests/checkout.spec.ts',
  'tests/profile.spec.ts',
  'tests/orders.spec.ts'
];

// A is stronger than B
const machines: Machine[] = [
  { name: 'A', capacity: 3, files: [] },
  { name: 'B', capacity: 1, files: [] }
];

const total = files.length;
const totalCapacity = machines.reduce((sum, m) => sum + m.capacity, 0);

let start = 0;

for (const machine of machines) {
  const count = Math.ceil((machine.capacity / totalCapacity) * total);
  machine.files = files.slice(start, start + count);
  start += count;
}

machines.forEach(m => {
  console.log(`${m.name}: ${m.files.join(' ')}`);
});