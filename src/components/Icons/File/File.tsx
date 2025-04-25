import { memo } from "react"
import { CCode, CSSCode, CppCode, CsCode, DartCode, GitCode, GoCode, HTMLCode, JSCode, JSONCode, JavaCode, KotlinCode, LuaCode, MDCode, PhpCode, PyCode, ReactCode, RubyCode, RustCode, ScalaCode, ShCode, SwiftCode, TSCode, TextCode, VueCode, YMLCode } from "./Code"
import { getIcon } from "../svg"
import { getFileExtension } from "@/lib/Utils/File"
import { supportAudioExt, supportImageExt, supportVideoExt } from "@/lib/Config/File/ext"

export const Img = getIcon(
    <>
        <path d="M896 64 128 64C64 64 0 124.032 0 188.032L0 832c0 64 64 128 128 128l768 0c64 0 128-64 128-128L1024 188.032C1024 124.032 960 64 896 64zM296 227.968c70.72 0 128 57.28 128 128 0 70.72-57.28 128-128 128s-128-57.28-128-128C168 285.312 225.28 227.968 296 227.968zM971.008 615.744l-126.976-126.976L580.8 752l155.328 155.328-73.536 0-258.56-258.56-258.56 258.56c0 0-11.392 0.64-28.416-5.312-13.952-4.928-23.872-15.872-23.872-15.872l310.912-310.912L544 715.2l299.968-300.032 126.976 126.976L970.944 615.744z"></path>
    </>
    , { fill: '#24BC77' }
)

export const Video = getIcon(
    <>
        <path
            d="M959.5 511.9c0-246.8-200.8-447.7-447.7-447.7C265 64.2 64.2 265 64.2 511.9c0 246.8 200.8 447.7 447.7 447.7H874v-49.7H716.5c144.2-74.5 243-224.9 243-398z m-845.6 0c0-219.4 178.5-397.9 397.9-397.9 219.4 0 397.9 178.5 397.9 397.9 0 219.4-178.5 397.9-397.9 397.9-219.4 0-397.9-178.5-397.9-397.9z" fill="#24BC77"></path><path d="M383.9 698.5l323.2-186.6-323.2-186.6v373.2z m39.5-304.8l204.7 118.2-204.7 118.2V393.7z" fill="#24BC77">
        </path>
    </>
)

export const Audio = getIcon(
    <path d="M786.041 157.916c12.236 9.466 24.383 18.923 34.822 29.878 7.156 7.499 46.555 14.042 81.053 13.13 26.828-0.713 50.994-9.015 53.964-6.091 10.729 10.513-63.475 77.317-45.22 112.97 76.713 149.77 65.469 336.709-44.262 478.493-151.322 195.513-432.742 231.247-628.443 79.79C42.262 714.628 6.266 433.226 157.597 237.705 308.919 42.188 590.348 6.458 786.041 157.916z m130.539 61.263c-46.445 7.978-79.717 5.342-120.369-10.458-60.082-23.345-171.672-106.257-221.096-30.835-27.486 41.943-18.229 330.898-18.814 424.693-63.79-52.402-127.924-97.721-212.811-91.097-98.704 7.706-192.652 91.638-158.388 201.956 49.37 158.92 325.375 185.161 390.175 39.723 16.632-37.322 12.229-76.758 16.396-116.229l29.428-279.967c4.765-29.761 9.674-41.555 26.25-66.768 120.877 53.097 207.19 76.505 269.229-71.018z"
        fill="#d5649c">
    </path>
)

export const Zip = getIcon(
    <>
        <path d="M97.9 376h828.4v269.2H97.9z" fill="#F95F5D" p-id="31195"></path><path d="M926.3 376V161.5c0-26.6-23.8-50.3-52.1-50.3H149.9c-28.3 0-52.1 23.7-52.1 50.3V376h828.5z m0 0" fill="#55C7F7" p-id="31196"></path><path d="M97.9 645.2v214.5c0 26.6 23.6 50.3 51.7 50.3h725c28.1 0 51.7-23.7 51.7-50.3V645.2H97.9z m0 0" fill="#7ECF3B" p-id="31197"></path><path d="M421.8 111.2h184.9V910H421.8z" fill="#FDAF42" p-id="31198"></path><path d="M606.7 457.4v112.4H413V457.4h193.7m31.1-45.9H381.9c-4.4 0-11.8 4.4-11.8 11.8v179c0 4.4 4.4 11.8 11.8 11.8h255.9c4.4 0 11.8-4.4 11.8-11.8v-179c-2.9-8.8-7.4-11.8-11.8-11.8z m0 0" fill="#FFFFFF" p-id="31199"></path>
    </>
)

export const Binary = getIcon(
    <path d="M390.4 492.8c-38.4 0-51.2 38.4-51.2 102.4v12.8l102.4-70.4c-12.8-25.6-25.6-44.8-51.2-44.8z m51.2 89.6l-96 70.4c6.4 32 19.2 44.8 44.8 44.8 32 0 51.2-38.4 51.2-102.4v-12.8z m0 0l-96 70.4c6.4 32 19.2 44.8 44.8 44.8 32 0 51.2-38.4 51.2-102.4v-12.8z m-51.2-89.6c-38.4 0-51.2 38.4-51.2 102.4v12.8l102.4-70.4c-12.8-25.6-25.6-44.8-51.2-44.8z m460.8-204.8L640 76.8c-6.4-6.4-12.8-12.8-25.6-12.8H192c-19.2 0-32 12.8-32 32v832c0 19.2 12.8 32 32 32h640c19.2 0 32-12.8 32-32V313.6c0-12.8 0-19.2-12.8-25.6z m-460.8 448c-64 0-96-51.2-96-140.8 0-89.6 32-140.8 96-140.8s96 51.2 96 140.8c0 89.6-32 140.8-96 140.8z m339.2-6.4h-192v-38.4h76.8V505.6l-76.8 51.2V512l76.8-51.2h44.8v230.4h70.4v38.4z m-128-403.2V140.8l185.6 185.6H601.6z m-256 326.4c6.4 32 19.2 44.8 44.8 44.8 32 0 51.2-38.4 51.2-102.4v-12.8l-96 70.4z m44.8-160c-38.4 0-51.2 38.4-51.2 102.4v12.8l102.4-70.4c-12.8-25.6-25.6-44.8-51.2-44.8z" fill="#1296db">
    </path>
)

const IconMatch = [
    {
        name: 'image',
        exts: supportImageExt,
        icon: Img
    },
    {
        name: 'video',
        exts: supportVideoExt,
        icon: Video
    },
    {
        name: 'audio',
        exts: supportAudioExt,
        icon: Audio
    },
    {
        name: 'zip',
        exts: ['zip', 'rar', '7z', 'tar', 'gz', 'bz2', 'xz', 'pak'],
        icon: Zip
    },
    {
        name: 'binary',
        exts: ['exe', 'dmg', 'iso', 'apk', 'dll', 'deb', 'rpm', 'msi', 'bin', 'bat', 'com', 'vbs', 'app', 'jar', 'apk', 'msu', 'cab', 'run', 'pkg', 'dmg', 'iso', 'appimage', 'xapk', 'msix'],
        icon: Binary
    },
    {
        name: 'react',
        exts: ['jsx', 'tsx'],
        icon: ReactCode
    },
    {
        name: 'vue',
        exts: ['vue'],
        icon: VueCode
    },
    {
        name: 'javascript',
        exts: ['js', 'mjs'],
        icon: JSCode
    },
    {
        name: 'typescript',
        exts: ['ts'],
        icon: TSCode
    },
    {
        name: 'html',
        exts: ['html', 'htm', 'xml', 'xhtml'],
        icon: HTMLCode
    },
    {
        name: 'css',
        exts: ['css', 'scss', 'sass', 'less'],
        icon: CSSCode
    },
    {
        name: 'json',
        exts: ['json'],
        icon: JSONCode
    },
    {
        name: 'py',
        exts: ['py'],
        icon: PyCode
    },
    {
        name: 'java',
        exts: ['java'],
        icon: JavaCode
    },
    {
        name: 'c',
        exts: ['c'],
        icon: CCode
    },
    {
        name: 'c++',
        exts: ['cpp'],
        icon: CppCode
    },
    {
        name: 'golang',
        exts: ['go'],
        icon: GoCode
    },
    {
        name: 'rust',
        exts: ['rs'],
        icon: RustCode
    },
    {
        name: 'shell',
        exts: ['sh', 'bash', 'zsh', 'bat'],
        icon: ShCode
    },
    {
        name: 'cs',
        exts: ['cs'],
        icon: CsCode
    },
    {
        name: 'php',
        exts: ['php'],
        icon: PhpCode
    },
    {
        name: 'kotlin',
        exts: ['kt', 'kts'],
        icon: KotlinCode
    },
    {
        name: 'ruby',
        exts: ['rb'],
        icon: RubyCode
    },
    {
        name: 'dart',
        exts: ['dart'],
        icon: DartCode
    },
    {
        name: 'swift',
        exts: ['swift'],
        icon: SwiftCode
    },
    {
        name: 'lua',
        exts: ['lua'],
        icon: LuaCode
    },
    {
        name: 'scala',
        exts: ['scala'],
        icon: ScalaCode
    },
    {
        name: 'md',
        exts: ['md', 'markdown'],
        icon: MDCode
    },
    {
        name: 'yml',
        exts: ['yaml', 'yml',],
        icon: YMLCode
    },
    {
        name: 'git',
        exts: ['gitignore', 'dockerignore', 'npmignore', 'yarnignore', 'eslintignore', 'prettierignore', 'stylelintignore'],
        icon: GitCode
    },
    {
        name: 'code',
        exts: ['txt', 'log', 'env', 'ini', 'properties', 'conf', 'config', 'htaccess', 'htpasswd', 'htgroups', 'htpasswd', 'htgroups', 'htaccess', 'htpasswd', 'htgroups'],
        icon: TextCode
    },

]

const FileIcon = memo(function FileIcon({ name }: {
    name?: string
}) {

    const ext = getFileExtension(name || '')
    const Icon = IconMatch.find(item => item.exts.includes(ext))?.icon || TextCode
    return <Icon />
})

FileIcon.displayName = 'FileIcon'

export default FileIcon