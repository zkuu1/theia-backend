import type {User, Subscription, History, Like, Comment, Favourite} from "@/generated/prisma/client"
import {type PaginationMeta, buildPaginationMeta } from "../pagination.dto"

export type RegisterUserRequest = {
    name: string
    email: string
    password: string
    // image: string
    // role: string
    // level: number
    // xp: number
    // is_ban: boolean
}

export type LoginUserRequest = {
    email: string
    password: string
}

export type LogoutUserRequest = {
    id: string
}


// data
export type UserData = {
    id: string
    name?: string | null
    email: string
    image?: string | null
    public_id?: string | null
    role: string
    level: number
    xp: number
    is_ban: boolean
    token?: string | null
    createdAt: Date
    updatedAt: Date

    subscription?: UserWithSubscriptionData[]
    histories?: UserWithHistoryData[]
    likes?: UserWithLikeData[]
    comments?: UserWithCommentData[]
    favourites?: UserWithFavouriteData[]
    
}

export type UserWithSubscriptionData = {
    id: string
    name: string
    status: string
    createdAt: Date
    updatedAt: Date
}

export type UserWithHistoryData = {
    id: string
    animeId: string
    episode: string
    completed_list: string
    createdAt: Date
    updatedAt: Date
}

export type UserWithCommentData ={
    id: string
    animeId: string
    comments: string
    createdAt: Date
    updatedAt: Date
}

export type UserWithFavouriteData = {
    id: string
    animeId: string
    is_favourite: boolean
    createdAt: Date
    updatedAt: Date
}

export type UserWithLikeData = {
    id: string
    animeId: string
    is_liked: boolean
    createdAt: Date
    updatedAt: Date
}

// template response
export type ApiResponse<T, M = unknown> = {
    message: string
    success: boolean
    data: T
    metadata?: M
}

// func
export function toUserData(
    user: User,
    subscription: Subscription[],
    histories: History[],
    likes: Like[],
    comments: Comment[],
    favourites: Favourite[],
    token?: string
): userData {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        public_id: user.public_id,
        role: user.role,
        level: user.level,
        xp: user.xp,
        is_ban: user.is_ban,
        token: token,
        
        subscription: subscription?.map(toSubscriptionData) || []

    }
}

export function toSubscriptionData(
    subscription: Subscription
): UserWithSubscriptionData {
    return {
        id: subscription.id,
        name: subscription.name,
        status: subscription.status,
        createdAt: subscription.createdAt,
        updatedAt: subscription.updatedAt
    }
}

export function toHistoryData(
    history: History
): UserWithHistoryData {
    return {
        id: history.id,
        animeId: history.animeId,
        episode: history.episode,
        completed_list: history.completed_list,
        createdAt: history.createdAt,
        updatedAt: history.updatedAt
    }
}

export function toLikeData(
    like: Like
): UserWithLikeData{
    return {
        id: like.id,
        animeId: like.animeId,
        is_liked: like.is_liked,
        createdAt: like.createdAt,
        updatedAt: like.updatedAt
    }
}

export function toCommentData(
    comment: Comment
): UserWithCommentData {
    return {
        id: comment.id,
        animeId: comment.animeId,
        comments: comment.comments,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt
    }
}
