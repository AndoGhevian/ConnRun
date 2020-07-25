import { MongoClient, MongoClientOptions } from 'mongodb';
/**Argument with which {@link ConnRunCallback} will be called. */
export interface ConnRunCallbackOptions {
    /**MongoClient instance
     *
     * See {@inheritDoc mongodb#MongoClient}
     */
    client: MongoClient;
}
/** */
export interface ConnRunOptions {
    /**uri of mongodb database to establish connection to, like: mongodb://localhost:8000 */
    url: string;
    /**options to use when instantiating {@link MongoClient} instance.
     *
     * See {@inheritDoc mongodb#MongoClientOptions}
     */
    MongoClientOptions?: MongoClientOptions;
    /**set to "true" to close mongodb connection on exiption.
     *
     * Note. if exiption occures during connection process, this flag loses it's meaning.
     * @defaultValue true
     * */
    disconnectOnFail?: boolean;
    /**
     * set to "true" to close mongodb connection after {@link ConnRun} function execution successfully finished.
     * @defaultValue false
     */
    disconnectOnSuccess?: boolean;
    /**set to "true" to throw occured exiptions from {@link ConnRun} function call.
     * @defaultValue true
     */
    throwOnExiption?: boolean;
    /**
     * set to "true" to output logs of current {@link ConnRun} function execution to the terminal.
     * @defaultValue true
     */
    logs?: boolean;
}
/**
 * This callback function call will be awaited after connection established with {@link ConnRunCallbackOptions} argument,
 * and afterwards will be awaited call of function subsequently returned or (resolved, in case of returning promise) by last function call.
 * @param options - useful information about connection which will be automatically passed to this function.
 * See {@inheritDoc ConnRunCallbackOptions}
 * @returns (or resolves to) function which is contain all your logic and returns (or resolves to) value
 * that in the end is the value which will be resolved by the ${@link ConnRun} function call.
 */
export interface ConnRunCallback<T> {
    (options: ConnRunCallbackOptions): (Promise<(...args: any[]) => Promise<T>>) | (Promise<(...args: any[]) => T>) | ((...args: any[]) => Promise<T>) | ((...args: any[]) => T);
}
/**
 * This function will automatically connect to db and thereafter execute provided function with information
 * about connection.
 * @param param0 - In this parameter you must provide connection information and additionally
 * options that define this function execution behaviour. See ${@inheritDoc ConnRunOptions}.
 * @param func - function that will contain your logic and whill be automatically executed by {@link ConnRun} function.
 *
 * See {@inheritDoc ConnRunCallback}
 * @param args - any arguments that you want to pass to "base" function call.
 */
export declare const ConnRun: <T>({ url, MongoClientOptions, disconnectOnFail, disconnectOnSuccess, throwOnExiption, logs }: ConnRunOptions | undefined, func: ConnRunCallback<T>, ...args: any[]) => Promise<NonNullable<T>>;
export default ConnRun;
