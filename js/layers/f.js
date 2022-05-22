addLayer("f", {
    name: "f(t)", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "f(t)", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(1),
        dt: new Decimal(1),
        x: new Decimal(1),
        y: new Decimal(1),
        z: new Decimal(1),
        mult: new Decimal(1),
    }},
    color: "#999999",
    resource: "f(t)", // Name of prestige currency
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    row: 0, // Row the layer is in on the tree (0 is the first row)
    tabFormat: [
        ["main-display", 4],
        "blank",
        ["display-text",
        function() {
            let text = 'f(t+dt) = f(t)*2^(0.001*<span style="color: #ff3333"><b>x</b></span>'
            text = text + '*<span style="color: #ff9933"><b>y</b></span>*<span style="color: #ffff33"><b>z</b></span>*<b>dt</b>)'
            return text
        }, {"font-size": "18px"}],
        "blank",
        ["display-text",
        function() { return '<span style="color: #ff3333"><b>x</b></span> = ' + formatWhole(player.f.x) }],
        ["display-text",
        function() { return '<span style="color: #ff9933"><b>y</b></span> = ' + formatWhole(player.f.y) }],
        ["display-text",
        function() { return '<span style="color: #ffff33"><b>z</b></span> = ' + formatWhole(player.f.z) }],
        ["display-text",
        function() { return '<b>dt</b> = ' + format(player.f.dt, 2) }],
        "blank",
        ["display-text",
        function() { return 'f(t) is multiplied by ' + format(player.f.mult, 4) + ' every second.' }],
        ["display-text",
        function() { return 'Any buyable purchase divides f(t) by its cost on purchase.' }],
        "blank",
        "buyables",
    ],
    buyables: {
        21: {
            title: "Variable <span style='color: #cc0000'><b>x</b>",
            cost(x) {
                return new Decimal(2).pow(new Decimal(2).pow(x).div(64))
            },
            effect(x) {
                return new Decimal(x)
            },
            display() {
                let text = "<br><h3>Effect:</h3> +"
                text = text + formatWhole(buyableEffect(this.layer, this.id))
                text = text + " to <span style='color: #cc0000'><b>x</b></span><br><h3>Bought:</h3> "
                text = text + formatWhole(getBuyableAmount(this.layer, this.id))
                text = text + "<br><h3>Cost:</h3> "
                text = text + format(this.cost(), 4)
                return text
            },
            canAfford() {
                return player[this.layer].points.gte(this.cost())
            },
            buy() {
                player[this.layer].points = player[this.layer].points.div(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {
                return true
            }
        },
        22: {
            title: "<span style='color: #cc6600'><b>y</b></span>-<span style='color: #cc0000'><b>x</b></span> Boost",
            cost(x) {
                return new Decimal(2).pow(new Decimal(2).pow(x.times(4)).times(8))
            },
            effect(x) {
                return new Decimal(x)
            },
            display() {
                let text = "<br><h3>Effect:</h3> <span style='color: #cc0000'><b>x</b></span> is increased by "
                text = text + formatWhole(buyableEffect(this.layer, this.id))
                text = text + "*<span style='color: #cc6600'><b>y</b></span><br><h3>Bought:</h3> "
                text = text + formatWhole(getBuyableAmount(this.layer, this.id))
                text = text + "<br><h3>Cost:</h3> "
                text = text + format(this.cost(), 4)
                return text
            },
            canAfford() {
                return player[this.layer].points.gte(this.cost())
            },
            buy() {
                player[this.layer].points = player[this.layer].points.div(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {
                return getBuyableAmount(this.layer, 23).gte(1)
            }
        },
        23: {
            title: "Variable <span style='color: #cc6600'><b>y</b>",
            cost(x) {
                return new Decimal(2).pow(new Decimal(2).pow(x.times(1.5)).div(8))
            },
            effect(x) {
                return new Decimal(x)
            },
            display() {
                let text = "<br><h3>Effect:</h3> +"
                text = text + formatWhole(buyableEffect(this.layer, this.id))
                text = text + " to <span style='color: #cc6600'><b>y</b></span><br><h3>Bought:</h3> "
                text = text + formatWhole(getBuyableAmount(this.layer, this.id))
                text = text + "<br><h3>Cost:</h3> "
                text = text + format(this.cost(), 4)
                return text
            },
            canAfford() {
                return player[this.layer].points.gte(this.cost())
            },
            buy() {
                player[this.layer].points = player[this.layer].points.div(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {
                return getBuyableAmount(this.layer, 21).gte(1)
            }
        },
        24: {
            title: "<span style='color: #cccc00'><b>z</b></span>-<span style='color: #cc6600'><b>y</b></span> Boost",
            cost(x) {
                return new Decimal(2).pow(new Decimal(2).pow(x.times(6)).times(256))
            },
            effect(x) {
                return new Decimal(x)
            },
            display() {
                let text = "<br><h3>Effect:</h3> <span style='color: #cc6600'><b>y</b></span> is increased by "
                text = text + formatWhole(buyableEffect(this.layer, this.id))
                text = text + "*<span style='color: #cccc00'><b>z</b></span><br><h3>Bought:</h3> "
                text = text + formatWhole(getBuyableAmount(this.layer, this.id))
                text = text + "<br><h3>Cost:</h3> "
                text = text + format(this.cost(), 4)
                return text
            },
            canAfford() {
                return player[this.layer].points.gte(this.cost())
            },
            buy() {
                player[this.layer].points = player[this.layer].points.div(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {
                return getBuyableAmount(this.layer, 31).gte(1)
            }
        },
        31: {
            title: "Variable <span style='color: #cccc00'><b>z</b>",
            cost(x) {
                return new Decimal(2).pow(new Decimal(2).pow(x.times(2)).times(1))
            },
            effect(x) {
                return new Decimal(x)
            },
            display() {
                let text = "<br><h3>Effect:</h3> +"
                text = text + formatWhole(buyableEffect(this.layer, this.id))
                text = text + " to <span style='color: #cccc00'><b>z</b></span><br><h3>Bought:</h3> "
                text = text + formatWhole(getBuyableAmount(this.layer, this.id))
                text = text + "<br><h3>Cost:</h3> "
                text = text + format(this.cost(), 4)
                return text
            },
            canAfford() {
                return player[this.layer].points.gte(this.cost())
            },
            buy() {
                player[this.layer].points = player[this.layer].points.div(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {
                return getBuyableAmount(this.layer, 23).gte(1)
            }
        },
        11: {
            title: "<b>dt</b> Increase",
            cost(x) {
                return new Decimal(2).pow(new Decimal(2).pow(x).times(8))
            },
            effect(x) {
                return new Decimal(x).times(0.1)
            },
            display() {
                let text = "<br><h3>Effect:</h3> +"
                text = text + format(buyableEffect(this.layer, this.id), 2)
                text = text + " to <b>dt</b><br><h3>Bought:</h3> "
                text = text + formatWhole(getBuyableAmount(this.layer, this.id))
                text = text + "<br><h3>Cost:</h3> "
                text = text + format(this.cost(), 4)
                return text
            },
            canAfford() {
                return player[this.layer].points.gte(this.cost())
            },
            buy() {
                player[this.layer].points = player[this.layer].points.div(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {
                return getBuyableAmount(this.layer, 23).gte(1)
            }
        },
    },
    update(diff) {
        player.f.x = new Decimal(1)
        player.f.x = player.f.x.add(buyableEffect(this.layer, 21))
        player.f.x = player.f.x.add(buyableEffect(this.layer, 22).times(player.f.y))

        player.f.y = new Decimal(1)
        player.f.y = player.f.y.add(buyableEffect(this.layer, 23))
        player.f.y = player.f.y.add(buyableEffect(this.layer, 24).times(player.f.z))

        player.f.z = new Decimal(1)
        player.f.z = player.f.z.add(buyableEffect(this.layer, 31))

        player.f.dt = new Decimal(1)
        player.f.dt = player.f.dt.add(buyableEffect(this.layer, 11))

        let mult = new Decimal(2)
        let exp = new Decimal(0.001)
        exp = exp.times(player.f.x)
        exp = exp.times(player.f.y)
        exp = exp.times(player.f.z)
        exp = exp.times(player.f.dt)
        mult = mult.pow(exp)
        player.f.mult = mult
        mult = mult.pow(diff)
        player.f.points = player.f.points.times(mult)
    },
    layerShown(){
        return true
    }
})
