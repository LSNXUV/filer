

import styles from './index.module.scss'

interface BalldanceParams {
}

const BalldanceLoading: React.FC<BalldanceParams> = ({ }) => {

    return (
        <>
            <div className={styles.container}>
                <div className={styles.loading}>
                    <div className={styles.circle}></div>
                    <div className={styles.circle}></div>
                    <div className={styles.circle}></div>
                    <div className={styles.shadow} style={{
                        backgroundColor: '#85ACF3'
                    }}></div>
                    <div className={styles.shadow}
                        style={{
                            backgroundColor: '#84FAB1'
                        }}
                    ></div>
                    <div className={styles.shadow}
                        style={{
                            backgroundColor: '#8ED4F1'
                        }}
                    ></div>
                    <div className={styles.text}></div>
                </div>
            </div>
        </>
    );
}
export default BalldanceLoading;
