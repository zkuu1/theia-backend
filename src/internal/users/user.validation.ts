import z from "zod"
import { type tFunction } from "@/lib/i18n";

export class UserValidation {

    static readonly register = (t: tFunction) => z.object({
        name: z.string().min(1, {
            message: t('validation.required', { field: 'Name' })
        }).max(50, {
            message: t('validation.max', { field: 'Name', count: 50 })
        }),

        email: z.string().min(1, {
            message: t('validation.required', {field: 'Email'})
        }).email({
            message: t('validation.invalidEmail')
        }).max(100, {
            message: t('validation.max', { field: 'Email', count: 100})
        }),

        password: z.string().min(7, {
            message: t('validation.min', {field: 'Password', count: 7})
        }).max(50, {
            message: t('validation.max', { field: 'Password', count: 50})
        })
    })

    static readonly login = (t: tFunction) => z.object({
        email: z.string().min(1, {
            message: t('validation.required', { field: 'Email'})
        }).email({
            message: t('validation.invalidEmail')
        }). max(100, {
            message: t('validation.max', {field: 'Email', count: 100 })
        }),

        password: z.string().min(1, {
            message: t('validation.required', { field: 'Password', count: 1})
        }).max(50, {
            message: t('validation.max', { field: 'Password', count: 50})
        })
    })
}