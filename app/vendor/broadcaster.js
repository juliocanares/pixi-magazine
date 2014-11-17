var Broadcaster = {
    signals: {}, listen: function (a, c) {
        this.currentSignal = a;
        this.signals[a] || (this.signals[a] = []);
        this.signals[a].push(c)
    }, dispatch: function (a, c) {
        if (this.signals[a])for (var b = 0; b < this.signals[a].length; b++)this.signals[a][b](c)
    }, remove: function (a, c) {
        if (this.signals[a]) {
            for (var b = [], d = 0; d < this.signals[a].length; d++)this.signals[a][d] != c && b.push(this.signals[a][d]);
            this.signals[a] = b
        }
    }
};
