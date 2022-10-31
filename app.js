new Vue({
  el: "#app",
  data: {
    playerLife: 100,
    monsterLife: 100,
    running: false,
    logs: [],
  },
  computed: {
    hasResult() {
      return this.monsterLife <= 0 || this.playerLife <= 0;
    },
  },
  methods: {
    startGame() {
      this.running = true;
      this.monsterLife = 100;
      this.playerLife = 100;
      this.logs = [];
    },
    attack(especial) {
      this.hurt("monsterLife", 5, 10, especial, "Jogador", "Boss", "player");
      if (this.monsterLife > 0) {
        this.hurt("playerLife", 7, 12, false, "Boss", "Jogador", "boss");
      }
    },
    hurt(atr, min, max, especial, source, target, cls) {
      const plus = especial ? 5 : 0;
      const hurt = this.getRandom(min + plus, max + plus);
      this[atr] = Math.max(this[atr] - hurt, 0);
      this.registerLog(`${source} atingiu ${target} com ${hurt}.`, cls);
    },
    heatAndHurt() {
      this.heal(10, 15);
      this.hurt("playerLife", 7, 12, false, "Boss", "Jogador", "boss");
    },
    heal(min, max) {
      const heal = this.getRandom(min, max);
      this.playerLife = Math.min(this.playerLife + heal, 101);
      this.registerLog(`Jogador curou ${heal} da sua vida.`, "player");
    },
    getRandom(min, max) {
      const value = Math.random() * (max - min) + min;
      return Math.round(value);
    },
    registerLog(text, cls) {
      this.logs.unshift({ text, cls });
    },
  },
  watch: {
    hasResult(value) {
      if (value) {
        this.running = false;
      }
    },
  },
});
