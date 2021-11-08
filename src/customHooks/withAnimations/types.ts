interface BaseConfig {
    easing: ((value: number) => number) | undefined,
    outPutRange: [string, string],
    duration?: number,
    delay?: number
}

export interface IWithLoopAnimation extends BaseConfig {

}


export interface IWithToggleAnimation extends BaseConfig {
    nativeDriver: boolean,
}