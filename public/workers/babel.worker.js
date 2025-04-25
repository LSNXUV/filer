importScripts('https://cdn.jsdelivr.net/npm/@babel/standalone/babel.min.js');

self.onmessage = function (e) {
    const [code] = e.data;
    try {
        const result = Babel.transform(code, {
            presets: ['env', 'typescript'],
            filename: 'file.ts',
        }).code;

        const logs = [];
        const capture = (prefix, args) => {
            logs.push(`${prefix}: ${args.map(String).join(' ')}`);
        };

        const originalLog = console.log;
        const originalWarn = console.warn;
        const originalError = console.error;
        const originalInfo = console.info;
        const originalDebug = console.debug;

        console.log = (...args) => capture('📘 Log', args);
        console.warn = (...args) => capture('⚠️ Warn', args);
        console.error = (...args) => capture('❌ Error', args);
        console.info = (...args) => capture('ℹ️ Info', args);
        console.debug = (...args) => capture('🐞 Debug', args);

        new Function(result)();

        console.log = originalLog;
        console.warn = originalWarn;
        console.error = originalError;
        console.info = originalInfo;
        console.debug = originalDebug;

        self.postMessage({ logs: logs.join('\n') });
    } catch (err) {
        self.postMessage({ error: err.message });
    }
};
