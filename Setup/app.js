new Vue({
    el: "#app",
    data:{
        playerHealth: 100,
        monsterHealth: 100,
        gameStarted: false,
        logs: [],
        isGameCancelled: false
    },
    methods: {
        startGame: function(){
            this.gameStarted = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.isGameCancelled = false;
            this.logs.unshift({
                isPlayer: true,
                text: "The game has started!"
            })
        },
        endGame: function(){
            this.playerHealth = 0;
            this.monsterHealth = 0;
            this.gameStarted = false;
        },
        attack: function(){
            var max = 10,
                min = 3;
            this.playerAttack(min, max);
            if(this.isGameCancelled === true){
                return false;
            }
            this.monsterAttack(min, max);
        }, 
        monsterAttack: function(min, max){
                var damage;

                damage = this.damage(min, max);
                this.playerHealth -= damage;
                this.logs.unshift({
                    isPlayer: false,
                    text: "The monster reduced the players's health by "+ damage
                })
                this.checkDamage();
        },
        playerAttack: function(min, max){
           var damage = this.damage(min, max);

            this.monsterHealth -= damage;
            this.logs.unshift({
                isPlayer: true,
                text: "The player reduced the monter's health by "+ damage
            })
            this.checkDamage();
        },
        specialAttack: function(){
            this.playerAttack(10, 20);
            if(this.isGameCancelled === true){
                return false;
            }

            this.monsterAttack(7, 13);
        },
        heal: function(){
            if(this.playerHealth <=95){
            this.playerHealth += 10;
            this.logs.unshift({
                isPlayer: true,
                text: "The player health healed up by 10!"
            })
            }else{
            this.playerHealth = 100;
            this.logs.unshift({
                isPlayer: true,
                text: "The player has completely recovered! Hurray..."
            })
            }
            this.damage(3,10)
            this.playerHealth -=this.damage(5,10)
        },
        giveUp: function(){
            if(confirm("Feeling like a pussy and quit?")){
                this.playerHealth = 0;
                alert("Even monster is disappointed!\nYou lose!")
                this.logs.unshift({
                    isPlayer: true,
                    text: "The player has given up!!"
                })
                this.confirmation()
            }
        },
        damage: function(min, max){
            var damage;
            return damage = Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkDamage: function(){

            if(this.monsterHealth <= 0){
                this.monsterHealth =0;
                this.confirmation();
                return;
            }

            if(this.playerHealth <= 0){
                this.playerHealth = 0;
                this.confirmation();            
                return;
            }
        },

        confirmation: function(){
            if(confirm("Play Again?")){
                this.startGame();
                this.logs.splice(0,this.logs.length);
            }else{
                this.endGame();
                this.logs.splice(0,this.logs.length);
                this.isGameCancelled = true;
            };    
        }
        }
})