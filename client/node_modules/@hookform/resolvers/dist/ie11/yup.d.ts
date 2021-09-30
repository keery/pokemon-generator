import { Resolver } from 'react-hook-form';
import Yup from 'yup';
declare type ValidateOptions<T extends Yup.AnyObjectSchema> = Parameters<T['validate']>[1];
export declare const yupResolver: <T extends Yup.AnyObjectSchema>(schema: T, options?: ValidateOptions<T>) => Resolver<Yup.Asserts<T>, object>;
export {};
