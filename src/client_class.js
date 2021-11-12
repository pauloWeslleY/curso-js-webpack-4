export default class Client {
   constructor(name) {
      this.name = name;
   }

   talk() {
      console.log(`Hello what are you doing?, my name is ${this.name}!`);
   }
}