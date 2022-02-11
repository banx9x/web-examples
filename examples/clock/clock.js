export default class {
    constructor(clock, start, record, stop, reset, records) {
        this.minute = 0;
        this.second = 0;
        this.milisecond = 0;
        this.count = 0;

        this.running = false;

        this.clock = clock;
        this.btnStart = start;
        this.btnRecord = record;
        this.btnStop = stop;
        this.btnReset = reset;
        this.records = records;

        this.init();
    }

    init() {
        this.mNode = document.createTextNode("00");
        this.sNode = document.createTextNode("00");
        this.msNode = document.createTextNode("0");

        this.btnStart.onclick = () => this.start();
        this.btnRecord.onclick = () => this.record();
        this.btnStop.onclick = () => this.stop();
        this.btnReset.onclick = () => this.reset();

        this.active();
        this.render();
    }

    active() {
        if (this.running) {
            this.btnStart.disabled = true;
            this.btnRecord.disabled = false;
            this.btnStop.disabled = false;
            this.btnReset.disabled = false;
        } else {
            this.btnStart.disabled = false;
            this.btnRecord.disabled = true;
            this.btnStop.disabled = true;
            this.btnReset.disabled = true;
        }
    }

    render() {
        this.clock.appendChild(this.mNode);
        this.clock.append(":");
        this.clock.appendChild(this.sNode);
        this.clock.append(".");
        this.clock.appendChild(this.msNode);
    }

    start() {
        if (!this.running) {
            this.timer = setInterval(() => {
                this.milisecond += 1;

                if (this.milisecond >= 10) {
                    this.milisecond = 0;
                    this.second++;

                    if (this.second >= 60) {
                        this.second = 0;
                        this.minute++;

                        this.mNode.textContent = String(this.minute).padStart(
                            2,
                            "0"
                        );
                    }

                    this.sNode.textContent = String(this.second).padStart(
                        2,
                        "0"
                    );
                }

                this.msNode.textContent = this.milisecond;
            }, 100);

            this.running = true;
            this.active();
        }
    }

    record() {
        if (this.running) {
            let p = document.createElement("p");
            p.className = "record";
            p.textContent = `#${++this.count} ${this.clock.textContent}`;
            this.records.appendChild(p);
        }
    }

    stop() {
        if (this.running) {
            clearInterval(this.timer);
            this.running = false;
            this.btnStart.disabled = false;
        }
    }

    reset() {
        this.timer && clearInterval(this.timer);
        this.running = false;
        this.minute = 0;
        this.second = 0;
        this.milisecond = 0;
        this.count = 0;
        this.mNode.textContent = "00";
        this.sNode.textContent = "00";
        this.msNode.textContent = "0";
        this.records.innerHTML = "";
        this.active();
    }
}
