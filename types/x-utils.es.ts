
/**
 * @typedef {object} Person
 * @property {string} name - Person's preferred name
 * @property {number} age - Age in years
 * @property {boolean} likesCilantro - Whether they like cilantro
 * @property {string} [nickname] - Optional: Nickname to use
 */
export interface Person {
    name:1,
    age:2,
    likesCilantro:boolean,
    nickname?:string
}
