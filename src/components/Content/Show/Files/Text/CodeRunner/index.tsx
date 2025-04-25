import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.scss'
import Resizer from '../Resizer';
import { Arrow } from '@/components/Icons/Public/Close';
import { CodeObject } from '..';
import { BabelRunner } from '@/lib/Utils/CodeRunner/babel';
import { createSubmission, getSubmissionResult } from '@/lib/service/codeRunner';
import TextFill from '@/components/public/Loading/TextFill';
import { MessageType } from '@/components/public/Message/Message';
import { useSingleInput } from '@/lib/Context/SingleInput';
import { useLang } from '@/lib/Context/Lang';

const initExpandHeight = 172; // 初始高度

function CodeRunner({ codeObject }: {
    codeObject: CodeObject
}) {
    const { Lang } = useLang()
    const { showSingleInput } = useSingleInput()

    const [result, setResult] = useState<{
        type: MessageType
        result: string
    } | null>(null);  // 运行结果
    const [expand, setExpand] = useState(false); // 运行器的展开状态
    const [loading, setLoading] = useState(false); // 运行器的加载状态
    const [runnerHeight, setRunnerHeight] = useState(0); // 运行器的内容高度

    const didFetch = useRef(false);
    const babelRunner = useRef<BabelRunner>(new BabelRunner({ timeout: 20000 })); // babel 运行器

    useEffect(() => {
        if (codeObject.code) {
            if (runnerHeight === 0) {
                setRunnerHeight(initExpandHeight) // 设置初始高度
            }

            // 使用babel运行js/ts代码
            if (codeObject.type === 'babel') {
                if (babelRunner.current.getStatus() === 'running') {
                    return;
                }
                setExpand(true);
                setLoading(true);
                babelRunner.current.run(codeObject.code).then((res) => {
                    setResult({
                        type: 'success',
                        result: `${res}`
                    });
                }).catch((err) => {
                    console.log('err', err);
                    setResult({
                        type: 'error',
                        result: `${err}`
                    });
                }).finally(() => {
                    setLoading(false);
                });

            } else if (codeObject.type === 'other') {
                // 其他类型的代码运行
                if (didFetch.current) return;
                showSingleInput({
                    required: false,
                    type: 'textarea',
                    title: Lang.FileExploer.Content.Show.Editor.CodeRunner.stdinTitle,
                    info: Lang.FileExploer.Content.Show.Editor.CodeRunner.stdinInfo,
                    handle(value) {
                        didFetch.current = true; // 防止开发环境多次请求
                        setExpand(true);
                        setLoading(true);
                        createSubmission({  // 创建代码提交
                            code: codeObject.code,
                            ext: codeObject.ext,
                            stdin: value
                        }, (err) => {
                            console.error(err);
                            setLoading(false);
                        }).then((res) => {
                            if (!res) {
                                setLoading(false);
                                return;
                            }
                            const { token } = res;
                            let timer = setInterval(() => { // 轮询获取结果
                                getSubmissionResult(token, (err) => {
                                    console.error(err);
                                    setLoading(false);
                                }).then((res) => {
                                    if (!res) {
                                        setLoading(false);
                                        clearInterval(timer);
                                        return;
                                    }
                                    if (res.status_id === 3) {
                                        setResult({
                                            type: 'success',
                                            result: `${res.stdout}`
                                        });
                                        setLoading(false);
                                        clearInterval(timer);
                                        didFetch.current = false;
                                    }
                                    if (res.status_id > 3) {
                                        setResult({
                                            type: 'error',
                                            result: `${res.status?.description}: ${res.compile_output ? `\n${res.compile_output}` : ''}${res.stderr ? `\n${res.stderr}` : ''}`
                                        });
                                        setLoading(false);
                                        clearInterval(timer);
                                        didFetch.current = false;
                                    }
                                });
                            }, 1000);
                        })
                    },
                    cancel(_) {
                    },
                })

            } else {
                // 完全类型检查
                let a: never = codeObject;
            }

        } else {
        }
    }, [codeObject])

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
                    <div className={styles.result} style={{ height: `calc(${runnerHeight}px - var(--footer-height))` }}>
                        <div className={styles.time}>{`${new Date().toLocaleString()}: \n`}</div>
                        {
                            loading
                                ? <TextFill className={styles.loading} bgColor={'transparent'} />
                                : <pre>{result?.result}</pre>
                        }
                    </div>
                }
            </div>
        </>
    )
}

export default CodeRunner