import axios from 'axios';
import { extToJudge0LanguageId } from '../Config/CodeRunner/language';
import { decodeFromBase64, encodeToBase64 } from '../Utils/CodeRunner/to';

const authToken = '416b6ea3damsh9222f375ad59827p148abejsne69daf21eb3c';

type CreateSubmissionResponse = {
    token: string
}
export async function createSubmission(
    data: {
        /** 代码文件内容 */
        code: string,
        /** 代码文件后缀 */
        ext: string,
        /** 代码运行输入 */
        stdin?: string
    },
    err: (err: any) => void = () => { },
) {
    const { code, ext, stdin = '' } = data;
    if (!(code && ext)) return null;

    const language_id = extToJudge0LanguageId[ext];

    const options = {
        method: 'POST',
        url: 'https://judge0-ce.p.rapidapi.com/submissions',
        params: {
            base64_encoded: 'true',
            wait: 'false',
            fields: '*'
        },
        headers: {
            'x-rapidapi-key': authToken,
            'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        data: {
            language_id,
            source_code: encodeToBase64(code),
            stdin: encodeToBase64(stdin),
        }
    };

    try {
        const response = await axios.request<CreateSubmissionResponse>(options);
        console.log(response.data);
        if (response.status !== 201) {
            err(response.data);
            return null;
        }
        return response.data;
    } catch (error) {
        console.error(error);
        err(error);
        return null
    }
}

type GetSubmissionResultResponse = {
    stdout: string,
    stderr: string | null,
    compile_output: string,
    message: string,
    exit_code: number,
    time: number,
    memory: number,
    token: string,
    status_id: number,
    status: {
        id: number,
        description: string,
        short_description: string,
        color: string
    }
}
export async function getSubmissionResult(
    token: string,
    err: (err: any) => void = () => { },
) {
    const options = {
        method: 'GET',
        url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
        params: {
            base64_encoded: 'true',
            fields: '*'
        },
        headers: {
            'x-rapidapi-key': authToken,
            'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
            'Content-Type': 'application/json'
        }
    };

    try {
        const response = await axios.request<GetSubmissionResultResponse>(options);
        return {
            ...response.data,
            stdout: decodeFromBase64(response.data.stdout),
            stderr: response.data.stderr ? decodeFromBase64(response.data.stderr) : null,
            compile_output: response.data.compile_output ? decodeFromBase64(response.data.compile_output) : null,
        };
    } catch (error) {
        console.error(error);
        err(error);
        return null
    }
}