import axios from 'axios';
import { extToJudge0LanguageId } from '../Config/CodeRunner/language';
const authToken = 'b8fa60f1cemshe8305b797ac5c6cp1d5f0ejsn6e5ee67b5901';
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
            'X-Auth-Token': authToken,
            'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        data: {
            language_id,
            source_code: btoa(code),
            stdin: btoa(stdin),
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
    stderr: string,
    compile_output: string,
    message: string,
    exit_code: number,
    time: number,
    memory: number,
    token: string,
    status: {
        id: number,
        description: string,
        short_description: string,
        color: string
    }
}
export async function getSubmissionResult(token: string) {
    const options = {
        method: 'GET',
        url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
        params: {
            base64_encoded: 'true',
            fields: '*'
        },
        headers: {
            'X-Auth-Token': authToken,
            'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
            'Content-Type': 'application/json'
        }
    };

    try {
        const response = await axios.request<GetSubmissionResultResponse>(options);
        return response.data;
    } catch (error) {
        console.error(error);
        return null
    }
}