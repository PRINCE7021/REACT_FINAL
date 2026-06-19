import { getRiskLevel } from '../services/dnaService';

const FIRST_NAMES = [
  'Aarav', 'Vivian', 'Noah', 'Mia', 'Liam', 'Ananya', 'Ethan', 'Sara', 'Kabir', 'Zoe',
  'Arjun', 'Layla', 'Mason', 'Riya', 'Lucas', 'Emma', 'Rohan', 'Chloe', 'Dev', 'Olivia',
  'Ishaan', 'Maya', 'Aiden', 'Priya', 'Owen', 'Tara', 'Yusuf', 'Nora', 'Karan', 'Isla'
];
const LAST_NAMES = [
  'Sharma', 'Patel', 'Khan', 'Mehta', 'Singh', 'Gupta', 'Iyer', 'Reddy', 'Verma', 'Nair',
  'Brown', 'Clark', 'Garcia', 'Lopez', 'Wilson', 'Anderson', 'Thomas', 'Walker', 'Hughes', 'Bennett'
];
const GENDERS = ['Female', 'Male', 'Other'];

function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildPatients(count = 1200, seed = 42) {
  const rand = mulberry32(seed);
  const patients = new Array(count);
  for (let i = 0; i < count; i += 1) {
    const first = FIRST_NAMES[Math.floor(rand() * FIRST_NAMES.length)];
    const last = LAST_NAMES[Math.floor(rand() * LAST_NAMES.length)];
    const age = 1 + Math.floor(rand() * 95);
    const gender = GENDERS[Math.floor(rand() * GENDERS.length)];
    const mutationCount = Math.floor(rand() * 12);
    const dnaId = `SEQ-${String(1 + Math.floor(rand() * 40)).padStart(4, '0')}`;
    patients[i] = {
      id: `PT-${String(i + 1).padStart(5, '0')}`,
      name: `${first} ${last}`,
      age,
      gender,
      dnaId,
      mutationCount,
      risk: getRiskLevel(mutationCount),
      registeredAt: new Date(Date.now() - Math.floor(rand() * 1500) * 86400000).toISOString()
    };
  }
  return patients;
}

export const PATIENTS = buildPatients(1200);
