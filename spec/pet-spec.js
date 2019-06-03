import { VirtualPet } from "./../src/pet.js";

describe("VirtualPet", function(){
  let testPet = new VirtualPet("testPet");
  let testPet_NoRand = new VirtualPet("NoRand");
  let testPet_NoRand_10 = new VirtualPet("NoRand_10");
  testPet_NoRand.personailty = "happy";
  testPet_NoRand.attentionLossRate = 15;
  testPet_NoRand.trait = "lethargic";
  testPet_NoRand.foodLossRate = 15;
  testPet_NoRand_10.attentionLossRate = 10;
  testPet_NoRand_10.foodLossRate = 10;


  beforeEach(function(){
    jasmine.clock().install();
    testPet.updateFoodMeter();
    testPet.updateAttentionMeter();
    testPet_NoRand.updateFoodMeter();
    testPet_NoRand.updateAttentionMeter();
    testPet_NoRand_10.updateFoodMeter();
    testPet_NoRand_10.updateAttentionMeter();
  });
  afterEach(function(){
    jasmine.clock().uninstall();
  });
  it("Should correctly set the name when the object is constructed", function(){
    expect(testPet.name).toEqual("testPet");
  });
  it("Should have full attention and food meters when constructed", function(){
    expect(testPet.foodMeter).toEqual(100);
    expect(testPet.attentionMeter).toEqual(100);
  });
  it("Should properly choose a trait and personailty when constructed", function(){
    expect(testPet.traitsArr).toContain(testPet.trait);
    expect(testPet.personalityArr).toContain(testPet.personailty);
  });
  it("Should properly determine Rates of loss based on trait and personailty", function(){
    var foodRateTest = testPet.determineFoodLoss(testPet_NoRand.trait);
    var attentionRateTest = testPet.determineAttentionLoss(testPet_NoRand.personailty);
    expect(foodRateTest).toEqual(testPet_NoRand.foodLossRate);
    expect(attentionRateTest).toEqual(testPet_NoRand.attentionLossRate);
  });
  it("Should properly starve to death if feeding is neglected", function(){
    testPet.foodMeter = 0;
    testPet.isStarving();
    var aliveTest = testPet.alive;
    expect(aliveTest).toEqual(false);
  });
  it("Should properly run away is attention is neglected", function(){
    testPet.attentionMeter = 0;
    testPet.isRunningAway();
    var runningTest = testPet.runningAway;
    expect(runningTest).toEqual(true);
  });
  it("Should properly lose the correct amount of hunger and attention over jsut over 30 seconds (Rate of 15)", function(){
    jasmine.clock().tick(30001);
    expect(testPet_NoRand.foodMeter).toEqual(98);
    expect(testPet_NoRand.attentionMeter).toEqual(98);
  });
  it("Should properly lose the correct amount of hunger and attention over jsut over 30 seconds (Rate of 10)", function(){
    //Doesn't need another clock().tick() as the clock running updated all objects
    expect(testPet_NoRand_10.foodMeter).toEqual(97);
    expect(testPet_NoRand_10.attentionMeter).toEqual(97);
  });
});
