
/*

*/ 
export function DirOpenIcon({size = 16}:{
    size?: number | string
}){
    return (
        <svg className="icon" width={size} height={size}
            viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1486" >
                <path  fill="#788994" 
                    d="M945.23 315.077H78.77c-47.262 0-78.77 31.508-78.77 78.77V945.23C0 992.492 31.508 1024 78.77 1024h866.46c47.262 0 78.77-31.508 78.77-78.77V393.847c0-47.261-31.508-78.77-78.77-78.77z m-866.46-78.77h866.46c47.262 0 78.77-31.507 78.77-78.769H630.154V78.77c0-39.384-23.63-78.769-78.77-78.769H78.77C31.508 0 0 31.508 0 78.77v78.768c0 47.262 31.508 78.77 78.77 78.77z" p-id="1487">
                </path>
        </svg>
    )
}

export function DirCloseIcon({size = 16}:{
    size?: number
}){
    return (
        <svg className="icon" width={size} height={size}
            viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1486" >
                <path  fill="#788994"
                    d="M928 352v-48c0-35.3-28.7-64-64-64H485.2c-21 0-40.7-10.3-52.6-27.6l-61.5-88.9c-12-17.3-31.6-27.6-52.6-27.6H64c-35.3 0-64 28.7-64 64v656c0 70.7 57.3 128 128 128h638c57.8 0 108.5-38.8 123.6-94.6L928 707.2l74.2-274.5c11-40.7-19.6-80.7-61.8-80.7H928zM80 160h230.1c5.3 0 10.2 2.6 13.2 6.9l50.6 73.1H80c-8.8 0-16-7.2-16-16v-48c0-8.8 7.2-16 16-16z m0 144h768c8.8 0 16 7.2 16 16v32H209c-28.9 0-54.2 19.4-61.8 47.3L79.7 649c-2.4 9-15.7 7.3-15.7-2.1V320c0-8.8 7.2-16 16-16z m784 394.7l-36.2 134c-7.5 27.9-32.9 47.3-61.8 47.3H125.4c-21.1 0-36.4-20-30.9-40.3l111.3-411.8c1.9-7 8.2-11.8 15.4-11.8h698.3c10.5 0 18.2 10 15.4 20.2l-7 25.7L864 698.7z" p-id="8084">
                </path>
        </svg>
    )
}