export default (input: number): string => {
    const ms = input % 1;
    const s = Math.floor(input) % 60;
    const m = Math.floor(input / 60) % 60;
    const h = Math.floor(input / 3600);

    // the else of the ternary produces 0.xxx, so the slice(1) call produces .xxx
    const msString = ms < .001 ? "" : ms.toFixed(3).slice(1);

    const sString = s < 10 ? `0${s}` : `${s}`;

    const mString = m < 10 ? `0${m}` : `${m}`;
    const hString = h === 0 ? "" : `${h}:`;

    return `${hString}${mString}:${sString}${msString}`;
};
