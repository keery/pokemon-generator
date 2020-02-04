/**
 * Pokemon information
 */
const ELEMENTS = [
    'fire',
    'grass',
    'water',
    'electric',
    'psychic',
    'fighting',
    'normal',
    // TODO: Find background
    // 'steel',
    // 'dark',
];

const HP_CHOICES = [
    '30',
    '40',
    '50',
    '60',
    '70',
    '80',
    '90',
    '100',
    '110',
    '120',
    '130',
    '140',
    '150',
    '160',
    '170',
    '180',
    '190',
    '200',
    '210',
    '220',
    '230',
    '240',
    '250',
];

const AMOUNT_CHOICES = ['', '+10', '+20', '+30', '+40', 'x2'];

const RESISTANCE_CHOICES = ['', '-10', '-20', '-30', '-40'];

const DAMMAGE_CHOICES = [
    '10',
    '10+',
    '10x',
    '20',
    '20+',
    '20x',
    '30',
    '30+',
    '30x',
    '40',
    '50',
    '60',
    '70',
    '80',
    '90',
    '100',
    '120',
    '150',
    '200',
];

const ATTACK_AMOUNT_CHOICES = ['1', '2', '3', '4'];

const RARITY_CHOICES = ['common', 'uncommon', 'rare'];

const RETREAT_CHOICES = ['0', '1', '2', '3', '4'];

/**
 * Local storage keys
 */
const KEY_CACHE_POKECARD = 'pokecard';
const KEY_CACHE_LNG = 'lngPG';


/**
 * Languages
 */

const LANGUAGES = ['en', 'fr', 'es'];

const DEFAULT_LANGUAGES = 'en';

export {
    KEY_CACHE_POKECARD,
    KEY_CACHE_LNG,
    LANGUAGES,
    DEFAULT_LANGUAGES,
    ELEMENTS,
    HP_CHOICES,
    AMOUNT_CHOICES,
    DAMMAGE_CHOICES,
    ATTACK_AMOUNT_CHOICES,
    RARITY_CHOICES,
    RETREAT_CHOICES,
    RESISTANCE_CHOICES,
};
