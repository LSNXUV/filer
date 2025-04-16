import { useEffect, useState } from 'react'
import styles from './index.module.scss'
import Wave from './Wave'
import { drawPlainWave } from './Plain'
import { drawRoundWave } from './Round'
import { useLang } from '@/lib/Context/Lang'

const drawMap = {
    plain: drawPlainWave,
    round: drawRoundWave,
}

type Wavekey = keyof typeof drawMap

export default function Waves({ url }: {
    url: string
}) {
    const { Lang } = useLang()

    const [draw, setDraw] = useState<Wavekey>('round')

    return (
        <div className={styles.container}>
            <div className={styles.topActions}>
                <div className={styles.change}>{Lang.FileExploer.Content.Show.Audio.Waves.changeWave}</div>
                <select
                    value={draw}
                    onChange={(e) => {
                        setDraw(e.target.value as Wavekey)
                    }}
                >
                    {
                        Object.keys(drawMap).map((w, i) => {
                            return (
                                <option key={i} value={w}>{w}</option>
                            )
                        })
                    }
                </select>
            </div>
            <Wave url={url} draw={drawMap[draw]} />
        </div>
    )
}
