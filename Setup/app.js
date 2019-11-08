new Vue({
    el: "#app",
    data:{
        playerHealth: 100,
        monsterHealth: 100,
        gameStarted: false
    },
    methods: {
        startGame: function(){
            this.gameStarted = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
        },

        attack: function(){
            var max = 10,
                min = 3;

                this.playerHealth -= this.damage(min, max);;
                this.checkDamage();

                max = 10;
                min =  3;
                this.monsterHealth -= this.damage(min, max);
                this.checkDamage();

        }, 
        specialAttack: function(){
            this.monsterHealth -= this.damage(10,20);
            this.playerHealth -= this.damage(7, 13);;
        },
        heal: function(){
            if(this.playerHealth <=95){
            this.playerHealth += 10;
            }else{
            this.playerHealth = 100;
            }
            this.damage(3,10)
            this.playerHealth -=this.damage(5,10)
        },
        giveUp: function(){
            if(confirm("Feeling like a pussy and quit?")){
                this.playerHealth = 0;
                alert("Even monster is disappointed!\nYou lose!")
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
                this.gameStarted = true;
                this.startGame();
            }else{
                this.gameStarted = false;
            };    
        }
        }
})