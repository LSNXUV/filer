import { memo, use, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styles from './index.module.scss'
import { getRandomByArray } from '@/lib/Utils/Random/array'
import { waveBarRandomColorArray } from '@/lib/Config/Content/Audio'

const FFT_SIZE = 512
const dataArray: Uint8Array = new Uint8Array(FFT_SIZE / 2)

const DPR = typeof window === 'object' ? window?.devicePixelRatio : 1

const getWaveBarColor = () => {
    return getRandomByArray(waveBarRandomColorArray)
}

const Wave = memo(({ url, draw }: {
    url: string
    draw: (options: {
        dataArray: Uint8Array
        cvsCtx: CanvasRenderingContext2D | null
        waveBarColor: string
    }) => any
}) => {

    const cvsRef = useRef<HTMLCanvasElement | null>(null)
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const analyserRef = useRef<AnalyserNode | null>(null)

    const [isInit, setIsInit] = useState(false)
    const [isPlay, setIsPlay] = useState(false)

    const drawRef = useRef(draw)

    useEffect(() => {
        drawRef.current = draw
    }, [draw])

    //初始化canvas
    useEffect(() => {
        const cvs = cvsRef.current
        if (!cvs) return;
        const rect = cvs.getBoundingClientRect()
        cvs.width = rect.width * DPR
        cvs.height = rect.height * DPR

        const ctx = cvs.getContext('2d')
        if (!ctx) {
            console.error('Canvas context not found')
            return;
        }

        ctx.setTransform(1, 0, 0, 1, 0, 0) // 重置
        ctx.scale(DPR, DPR) // 缩放坐标系统

        // 清除画布
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.clearRect(0, 0, rect.width, rect.height)
    }, [])

    useEffect(() => {
        const audioCur = audioRef.current
        if (!audioCur) return;

        let source: MediaElementAudioSourceNode;
        let audioCtx: AudioContext;

        let onPlay = function () {
            //初始化
            try {
                setIsPlay(true)

                audioCtx = new AudioContext()
                source = audioCtx.createMediaElementSource(audioCur)

                analyserRef.current = audioCtx.createAnalyser()
                const curAnalyser = analyserRef.current
                curAnalyser.fftSize = FFT_SIZE

                source.connect(curAnalyser)
                curAnalyser.connect(audioCtx.destination)

                setIsInit(true)
            } catch (error) {

            }
        }
        let onPause = function () {
            setIsPlay(false)
        }
        audioCur.addEventListener('play', onPlay)
        audioCur.addEventListener('pause', onPause)

        return () => {
            audioCur.removeEventListener('play', onPlay)
            audioCur.removeEventListener('pause', onPause)
            if (source) {
                source.disconnect()
            }
            if (audioCtx) {
                audioCtx.close()
            }
        }
    }, [])


    //绘画canvas
    useEffect(() => {
        let animationId: number;
        if (isInit && isPlay) {
            //把分析出的波形绘制到canvas
            const loopDraw = () => {
                if (!isPlay) return
                animationId = requestAnimationFrame(loopDraw)

                //让分析器节点分析出数据到数组中
                if (!analyserRef.current) {
                    return;
                }
                analyserRef.current.getByteFrequencyData(dataArray)
                //绘画
                drawRef.current({
                    cvsCtx: cvsRef.current?.getContext('2d') || null,
                    waveBarColor: getWaveBarColor(),
                    dataArray
                })
            }
            loopDraw()
        }
        return () => {
            cancelAnimationFrame(animationId)
        }
    }, [isInit, isPlay])

    return (
        <div className={styles.container}>
            <div className={styles.wave}>
                <canvas ref={cvsRef}></canvas>
            </div>
            <audio className={styles.audio} controls src={url} ref={audioRef}>
            </audio>
        </div>
    )
})

Wave.displayName = 'Wave';
export default Wave
