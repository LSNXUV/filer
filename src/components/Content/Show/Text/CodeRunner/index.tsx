import React, { useEffect, useState } from 'react'
import * as Babel from '@babel/standalone';
import styles from './index.module.scss'
import Resizer from '../Resizer';
import { Arrow } from '@/components/Icons/Public/Close';

export const runCode = (code: string) => {
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

const captureConsoleLog = (run: () => void): string => {
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


function CodeRunner({ codeObject: { code }, isCurrent }: {
    codeObject: {
        code: string
    },
    isCurrent: boolean
}) {

    const [result, setResult] = useState<string | null>(null);  // 运行结果
    const [expand, setExpand] = useState(false); // 运行器的展开状态
    const [runnerHeight, setRunnerHeight] = useState(0); // 运行器的内容高度

    useEffect(() => {
        if (code) {
            setExpand(true)
            if (runnerHeight === 0) {
                setRunnerHeight(100); // 设置初始高度为100px
            }
            const result = captureConsoleLog(() => {
                runCode(code);
            });

            setResult(result);
        } else {
        }
    }, [code])

    const onToggle = (b?: boolean) => {
        setExpand((s) => {
            return b ?? !s;
        });
    }

    return (
        <>
            <div className={`${styles.resultContainer} ${expand ? '' : styles.unexpand}`}>
                {
                    expand &&
                    <Resizer onToggle={onToggle} setRunnerHeight={setRunnerHeight} />
                }
                <Arrow className={`${styles.close} ${expand ? '' : styles.unexpand}`} onClick={() => onToggle()} />
                {
                    expand &&
                    <pre style={{ height: `${runnerHeight}px` }}>
                        {result}
                    </pre>
                }
            </div>
        </>
    )
}

export default CodeRunner