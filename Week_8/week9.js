class Vehicle {
    constructor(color, currentSpeed, maxSpeed) {
      this.color = color;
      this.currentSpeed = currentSpeed;
      this.maxSpeed = maxSpeed;
    }
    move() {
      console.log("moving at", this.currentSpeed);
  }
    accelerate(amount) {
      this.currentSpeed += amount;
  } }

  class Motorcycle extends Vehicle {
    constructor(color, currentSpeed, maxSpeed, fuel) {
      super(color, currentSpeed, maxSpeed);
      this.fuel = fuel;
    }
    doWheelie() {
      console.log("Driving on one wheel!");
  } }

  class Car extends Motorcycle {
    constructor(color, currentSpeed, maxSpeed, fuel, doors, storage) {
        super(color, currentSpeed, maxSpeed, fuel);
        this.doors = doors;
        this.storage = storage;
    }
  }

  /* let motor = new Motorcycle("Black", 0, 250, "gasoline");

    console.log(motor.color);
    motor.accelerate(50);
    motor.move(); */

    let car = new Car ("red", 30, 220, "Gasoline", 4, "fits 4 bags")
    console.log("The car is " + car.color)
    car.accelerate(60);
    car.move();
    console.log("The car has " + car.doors + " doors and " + car.storage);

