export class VirtualPet{

  constructor(petName){
    this.name = petName;
    this.foodMeter = 100;
    this.attentionMeter = 100;
    this.alive = true;
    this.runningAway = false;
    this.traitsArr = ["active", "lethargic"];
    this.personalityArr = ["happy", "sad"];
    this.trait = this.chooseTrait();
    this.personailty = this.choosePersonality();
    this.foodLossRate = this.determineFoodLoss(this.trait); //Seconds needed to update food
    this.attentionLossRate = this.determineAttentionLoss(this.personailty); //Seconds needed to update loneliness
  }

  updateFoodMeter(){
    setInterval(() => {
      if(this.foodMeter > 0){
        this.foodMeter--;
      } else {
        this.foodMeter = 0;
      }
    }, this.foodLossRate * 1000)
  }

  updateAttentionMeter(){
    setInterval(() => {
      if(this.attentionMeter > 0){
        this.attentionMeter--;
      } else {
        this.attentionMeter = 0;
      }
    }, this.attentionLossRate * 1000);
  }

  chooseTrait(){
    return this.traitsArr[this.getRandomNum(0, this.traitsArr.length - 1)];
  }

  choosePersonality(){
    return this.personalityArr[this.getRandomNum(0, this.personalityArr.length - 1)];
  }

  determineFoodLoss(myCase){
    switch(myCase){
      case "active": //Higher rate of loss
        return 10;
      case "lethargic": //Slower rate of loss
        return 15;
    }
  }

  determineAttentionLoss(myCase){
    switch(myCase){
      case "happy": //Slower rate of loss
        return 15;
      case "sad": //Higher rate of loss
        return 10;
    }
  }
  getRandomNum(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  isRunningAway(){
    if(this.attentionMeter === 0){
      this.runningAway = true;
    }else{
      this.runningAway = false;
    }
  }
  isStarving(){
    if(this.foodMeter === 0){
      this.alive = false;
    }else{
      this.alive = true;
    }
  }
}
