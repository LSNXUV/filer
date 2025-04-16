
export const drawPlainWave = ({ cvsCtx, waveBarColor, dataArray }: {
    dataArray: Uint8Array
    cvsCtx: CanvasRenderingContext2D | null
    waveBarColor: string
}) => {
    if (!cvsCtx) return

    const { width, height } = cvsCtx.canvas.getBoundingClientRect()
    //clear画布
    cvsCtx.clearRect(0, 0, width, height)

    const len = dataArray.length / 2.56;    //条数
    const barWidth = width / len / 2;       //单条宽度
    cvsCtx.fillStyle = waveBarColor
    for (let i = 0; i < len; i++) {
        const data = dataArray[i];
        const barHeight = (data / 255) * height;
        const x1 = i * barWidth + width / 2;
        const x2 = width / 2 - (i + 1) * barWidth;
        const y = height - barHeight;

        cvsCtx.fillRect(x1, y, barWidth - 1, barHeight);   // -1是留缝隙
        cvsCtx.fillRect(x2, y, barWidth - 1, barHeight);
    }
}