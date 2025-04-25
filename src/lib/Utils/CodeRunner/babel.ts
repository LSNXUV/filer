export class BabelRunner {
    private config: { timeout: number };
    private worker: Worker | null = null;

    constructor(config: { timeout: number }) {
        this.config = config;
    }

    getStatus() {
        return this.worker ? 'running' : 'idle';
    }

    async run(code: string, timeout = this.config.timeout): Promise<string> {
        if (this.worker) {
            this.worker.terminate();
            this.worker = null;
        }
        
        return new Promise((resolve, reject) => {
            this.worker = new Worker(new URL('./babel.worker.ts?worker&inline', import.meta.url), {});

            const timer = setTimeout(() => {
                this.worker?.terminate();
                this.worker = null;
                reject('⏰ 执行超时');
            }, timeout);

            this.worker.onmessage = (e) => {
                clearTimeout(timer);
                const { logs, error } = e.data;
                if (error) {
                    reject(`❌ 错误: ${error}`);
                } else {
                    resolve(logs);
                }
                this.worker?.terminate();
                this.worker = null;
            };

            this.worker.onerror = (e) => {
                clearTimeout(timer);
                reject(`🚨 Worker 错误: ${e.message}`);
                this.worker?.terminate();
                this.worker = null;
            };

            this.worker.postMessage([code]);
        });
    }

    terminate() {
        if (this.worker) {
            this.worker.terminate();
            this.worker = null;
        }
    }
}
