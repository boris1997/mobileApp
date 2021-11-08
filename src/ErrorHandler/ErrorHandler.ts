
class ErrorHandler {
    public static errorsPool: {[key: string]: string } = {}

    /** 
     * @handleError
     * Выводит в консоль локации ошибок с указанием класса, метода и текста ошибки
     * @property errorClassLocation: название класса
     * @property methodLocation: название метода
     * @property text: ошибка
    */ 
    public static handleError(errorClassLocation: string, methodLocation: string, text: any) {
        const error: {[key: string]: string } = {[errorClassLocation]: `In method: ${methodLocation} ERROR: ${text}`}
        Object.assign(this.errorsPool, error)
        console.log(this.errorsPool)
    };

};

export default ErrorHandler