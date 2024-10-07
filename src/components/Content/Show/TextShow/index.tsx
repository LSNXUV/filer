
import { Files } from '@/lib/Types/File';
import styles from './index.module.scss';
import { Editor } from '../Editor';

export const TextShow = ({ file }: {
    file: Files
}) => {
    
    return (
        <div className={styles.container}>
            <Editor file={file} />
        </div>
    );
}

export default TextShow; 