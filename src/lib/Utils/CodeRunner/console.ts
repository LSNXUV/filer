export const captureConsoleLog = (run: () => void): string => {
    const logs: string[] = [];
    const originalLog = console.log;
    const originalWarn = console.warn;
    const originalError = console.error;

    console.log = (...args) => {    // 拦截 console.log
        logs.push(args.map(String).join(' '));
        originalLog(...args);
    };
    console.warn = (...args) => {   // 拦截 console.warn
        logs.push(`⚠️ Warning: ${args.map(String).join(' ')}`);
        originalWarn(...args);
    };
    console.error = (...args) => {  // 拦截 console.error
        logs.push(`❌ Error: ${args.map(String).join(' ')}`);
        originalError(...args);
    };

    try {
        run();
    } catch (err) {
        logs.push(`❌ Error: ${err}`);
    }

    console.log = originalLog;
    console.warn = originalWarn;
    console.error = originalError;
    return logs.join('\n');
};