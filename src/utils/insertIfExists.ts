const insertIfExists = (text: string|undefined, delim: string, putDelimiterBefore?: boolean): string => putDelimiterBefore
    ? (text ? delim + text : "") 
    : (text ? text + delim : "") 
;
export default insertIfExists;