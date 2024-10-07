import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styles from './index.module.scss'
import { randomRGBColor } from '@/lib/Fun/Random/egbColor'

const FFT_SIZE = 512

const canvasWidth = typeof window === 'object' ? window.innerWidth / 2 : 1024
const canvasHeight = canvasWidth / 1.5

export default function Plain({url}: {
    url: string
}) {

    const cvsRef = useRef<HTMLCanvasElement | null>(null)
    const audioRef = useRef<HTMLAudioElement | null>(null)

    const [isInit, setIsInit] = useState(false)
    const [dataArray, setDataArray] = useState<Uint8Array>(new Uint8Array())
    const analyser = useRef<AnalyserNode | null>(null)

    const initCvs = useCallback(() => {
        const cvs = cvsRef.current
        console.log('cvs:',cvs)
        if(!cvs) return;
        cvs.width = canvasWidth * devicePixelRatio;
        cvs.height = canvasHeight * devicePixelRatio;
        console.log('devicePixelRatio',devicePixelRatio,'w h:',cvs.width,cvs.height)
    },[])

    

    useEffect(() => {
        console.log('init canvas')
        initCvs()
    },[])


    useEffect(() => {
        if(!audioRef.current) return;
        let onPlay:EventListenerOrEventListenerObject;
        let source:MediaElementAudioSourceNode;
        let audioCtx:AudioContext;
        const audioCur = audioRef.current

        
        onPlay = function(){
            if(isInit){
                return;
            }                
            // console.log('play')
            //初始化
            try {
                audioCtx = new AudioContext()
                source = audioCtx.createMediaElementSource(audioCur)
                
                analyser.current = audioCtx.createAnalyser()
                const curAnalyser = analyser.current
                curAnalyser.fftSize = FFT_SIZE
                // setDataArray(new Uint8Array(curAnalyser.frequencyBinCount))

                source.connect(curAnalyser)
                
                curAnalyser.connect(audioCtx.destination)
                // console.log('inited!!')
                setIsInit(true)
            } catch (error) {
                
            }
        }
        audioCur.addEventListener('play',onPlay)

        
        return () => {
            if(audioRef.current && onPlay){
                audioRef.current.removeEventListener('play',onPlay)
            }
            if(source){
                source.disconnect()
            }
            if(audioCtx){
                audioCtx.close()
            }
        }
    },[])

    useEffect(() => {
        if(isInit) {
            draw()
        }
    },[isInit])
    
    //把分析出的波形绘制到canvas
    function draw(){
        requestAnimationFrame(draw)
        const cvsCtx = cvsRef.current?.getContext('2d') || null
        if(!cvsCtx){ 
            // console.log('no ctx')
            return;
        }
        //清空画布
        // console.log('clear canvas')
        const {width,height} = cvsCtx.canvas
        cvsCtx.clearRect(0,0,width,height)


        //让分析器节点分析出数据到数组中
        if(!analyser.current){
            // console.log('no analyser.current!!!');
            return;
        }
        const newDataArray:Uint8Array = new Uint8Array(FFT_SIZE / 2)
        analyser.current.getByteFrequencyData(newDataArray)
        // console.log('dataArray:',newDataArray)
        
        //绘画
        const len = newDataArray.length / 2.5;
        const barWidth = width / len / 2;
        cvsCtx.fillStyle = randomRGBColor()
        for (let i = 0; i < len; i++) {
            const data = newDataArray[i];
            const barHeight = data / 255 * height;
            const x1 = i * barWidth + width / 2;
            const x2 = width / 2 - (i + 1) * barWidth;
            const y = height - barHeight;
            
            cvsCtx.fillRect(x1,y,barWidth,barHeight);
            cvsCtx.fillRect(x2,y,barWidth,barHeight);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.wave}>
                <canvas ref={cvsRef}></canvas>
            </div>
            <audio className={styles.audio} controls src={url} ref={audioRef}>
            </audio>
        </div>
    )
}
