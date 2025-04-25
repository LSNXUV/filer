export class BabelRunner {
    private config: {
        timeout: number,
    };
    private worker: Worker | null = null;

    constructor(config: { timeout: number }) {
        this.config = config;
    }

    getStatus() {
        return this.worker ? 'running' : 'idle';
    }

    async run(code: string, timeout = this.config.timeout): Promise<string> {
        // 如果已有 worker，在重新执行前终止
        if (this.worker) {
            this.worker.terminate();
            this.worker = null;
        }
        return new Promise((resolve, reject) => {
            const workerCode = `
                self.onmessage = function(e) {
                    const [code] = e.data;
                    try {
                        importScripts('https://cdn.jsdelivr.net/npm/@babel/standalone/babel.min.js');
                        const result = Babel.transform(code, {
                            presets: ['env', 'typescript'],
                            filename: 'file.ts',
                        }).code;

                        const logs = [];
                        const capture = (prefix, args) => {
                            logs.push(\`\${prefix}: \${args.map(String).join(' ')}\`);
                        };

                        // 保存原始的 console 方法
                        const originalLog = console.log;
                        const originalWarn = console.warn;
                        const originalError = console.error;
                        const originalInfo = console.info;
                        const originalDebug = console.debug;

                        // 重写 console 方法来捕获日志
                        console.log = (...args) => capture('📘 Log', args);
                        console.warn = (...args) => capture('⚠️ Warn', args);
                        console.error = (...args) => capture('❌ Error', args);
                        console.info = (...args) => capture('ℹ️ Info', args);
                        console.debug = (...args) => capture('🐞 Debug', args);

                        // 执行转换后的代码
                        new Function(result)();

                        // 恢复原始的 console 方法
                        console.log = originalLog;
                        console.warn = originalWarn;
                        console.error = originalError;
                        console.info = originalInfo;
                        console.debug = originalDebug;

                        // 返回捕获到的日志
                        self.postMessage({ logs: logs.join('\\n') });
                    } catch (err) {
                        self.postMessage({ error: err.message });
                    }
                };
            `;

            const blob = new Blob([workerCode], { type: 'application/javascript' });
            this.worker = new Worker(URL.createObjectURL(blob));

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
