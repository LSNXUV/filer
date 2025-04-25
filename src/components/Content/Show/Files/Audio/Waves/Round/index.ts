

export const drawRoundWave = ({ cvsCtx, waveBarColor, dataArray }: {
    dataArray: Uint8Array
    cvsCtx: CanvasRenderingContext2D | null
    waveBarColor: string
}) => {
    if (!cvsCtx) return;

    const { width, height } = cvsCtx.canvas.getBoundingClientRect();
    //clear画布
    cvsCtx.clearRect(0, 0, Math.max(cvsCtx.canvas.width, width), Math.max(cvsCtx.canvas.height, height));

    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) * 0.15; // 半径，留一些边距
    const len = dataArray.length - 76;
    const angleStep = (2 * Math.PI) / len; // 每条之间的角度

    cvsCtx.fillStyle = waveBarColor;

    for (let i = 0; i < len; i++) {
        const data = dataArray[i];
        const barHeight = Math.floor((data / 255) * (height - radius) * 0.5)

        // 当前条的角度
        const angle = i * angleStep;

        // 计算条的起始点和终止点（沿圆周方向）
        const startX = centerX + radius * Math.cos(angle);
        const startY = centerY + radius * Math.sin(angle);

        // 计算条的宽度
        const barWidth = +((2 * Math.PI * radius) / len).toFixed(1) + 1; // -2是留缝隙

        // 保存上下文状态以处理旋转
        cvsCtx.save();
        cvsCtx.translate(startX, startY);
        cvsCtx.rotate(angle);
        cvsCtx.fillRect(0, -barWidth / 2, barHeight, barWidth);
        cvsCtx.restore();
    }
}