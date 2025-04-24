import * as Babel from '@babel/standalone';
import { captureConsoleLog } from './console';

// 同步运行代码
const run = (code: string) => {
    try {
        const transformed = Babel.transform(code, {
            presets: ['env', 'typescript'], // 支持 TS
            filename: 'file.ts',
        }).code;
        const fn = new Function(transformed || 'no code to run!');
        fn(); // 直接运行
    } catch (err) {
        console.error('运行错误:', err);
    }
};
// 同步运行代码
export function runCodeByBabel(code: string): string {
    return captureConsoleLog(() => run(code));
}


// worker异步运行代码
export class BabelRunner {
    private config: {
        timeout: number,
    };
    private worker: Worker | null = null;

    constructor(config: { timeout: number }) {
        this.config = config
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
            // resolve = (res) => {
            //     this.status = 'idle';
            //     resolve(res);
            // };
            // reject = (err) => {
            //     this.status = 'idle';
            //     reject(err);
            // };
            const workerCode = `
                self.onmessage = function(e) {
                    const [code] = e.data;
                    try {
                        importScripts('https://unpkg.com/@babel/standalone/babel.min.js');
                        const result = Babel.transform(code, {
                            presets: ['env', 'typescript'],
                            filename: 'file.ts',
                        }).code;

                        const logs = [];
                        const capture = (prefix, args) => {
                            logs.push(\`\${prefix}: \${args.map(String).join(' ')}\`);
                        };

                        console.log = (...args) => capture('📘 Log', args);
                        console.warn = (...args) => capture('⚠️ Warn', args);
                        console.error = (...args) => capture('❌ Error', args);
                        console.info = (...args) => capture('ℹ️ Info', args);
                        console.debug = (...args) => capture('🐞 Debug', args);

                        new Function(result)();
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
