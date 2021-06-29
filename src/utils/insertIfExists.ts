export default (text: string|undefined, delim: string, putDelimiterBefore?: boolean): string => 
    putDelimiterBefore
        ? (text ? delim + text : "") 
        : (text ? text + delim : "");
