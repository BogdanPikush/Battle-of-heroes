"use strict";
// Enum для типів героїв
var HeroType;
(function (HeroType) {
    HeroType["Warrior"] = "WARRIOR";
    HeroType["Mage"] = "MAGE";
    HeroType["Archer"] = "ARCHER";
})(HeroType || (HeroType = {}));
// Enum для типів атак
var AttackType;
(function (AttackType) {
    AttackType["Physical"] = "PHYSICAL";
    AttackType["Magical"] = "MAGICAL";
    AttackType["Ranged"] = "RANGED";
})(AttackType || (AttackType = {}));
// Функція створення нового героя
function createHero(name, type) {
    const baseStats = {
        [HeroType.Warrior]: { health: 120, attack: 30, defense: 20, speed: 15 },
        [HeroType.Mage]: { health: 80, attack: 50, defense: 10, speed: 20 },
        [HeroType.Archer]: { health: 100, attack: 40, defense: 15, speed: 25 }
    };
    return {
        id: Math.floor(Math.random() * 100000),
        name,
        type,
        attackType: type === HeroType.Warrior ? AttackType.Physical : type === HeroType.Mage ? AttackType.Magical : AttackType.Ranged,
        stats: baseStats[type],
        isAlive: true
    };
}
// Функція розрахунку пошкодження
function calculateDamage(attacker, defender) {
    const attackMultiplier = Math.random() < 0.2 ? 2 : 1; // 20% шанс критичного удару
    const baseDamage = attacker.stats.attack * attackMultiplier;
    const damage = Math.max(baseDamage - defender.stats.defense, 0);
    const remainingHealth = Math.max(defender.stats.health - damage, 0);
    defender.stats.health = remainingHealth;
    defender.isAlive = remainingHealth > 0;
    return {
        damage,
        isCritical: attackMultiplier === 2,
        remainingHealth
    };
}
// Generic функція для пошуку героя в масиві
function findHeroByProperty(heroes, property, value) {
    return heroes.find(hero => hero[property] === value);
}
// Функція проведення раунду бою між героями
function battleRound(hero1, hero2) {
    if (!hero1.isAlive || !hero2.isAlive) {
        return `${!hero1.isAlive ? hero1.name : hero2.name} is already defeated.`;
    }
    const attacker = hero1.stats.speed >= hero2.stats.speed ? hero1 : hero2;
    const defender = attacker === hero1 ? hero2 : hero1;
    const attackResult = calculateDamage(attacker, defender);
    let result = `${attacker.name} attacks ${defender.name} and deals ${attackResult.damage} damage`;
    if (attackResult.isCritical) {
        result += ` (Critical Hit!)`;
    }
    result += `. ${defender.name} has ${attackResult.remainingHealth} health remaining.`;
    if (!defender.isAlive) {
        result += ` ${defender.name} is defeated!`;
    }
    return result;
}
// Створення масиву героїв
const heroes = [
    createHero("Дмитро", HeroType.Warrior),
    createHero("Мерлін", HeroType.Mage),
    createHero("Леголас", HeroType.Archer)
];
// Демонстрація функціоналу
console.log("--- Heroes ---");
console.log(heroes);
console.log("\n--- Find Hero ---");
const foundHero = findHeroByProperty(heroes, "type", HeroType.Mage);
console.log(foundHero);
console.log("\n--- Battle Rounds ---");
const battleResult1 = battleRound(heroes[0], heroes[1]);
console.log(battleResult1);
const battleResult2 = battleRound(heroes[1], heroes[2]);
console.log(battleResult2);
console.log("\n--- Final Hero States ---");
console.log(heroes);
