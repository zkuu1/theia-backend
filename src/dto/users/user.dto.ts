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

// type
export type ToUserDataProps ={
    user: User;
    subscriptions?: Subscription[];
    histories?: History[];
    likes?: Like[];
    comments?: Comment[];
    favourites?: Favourite[];
    token?: string;
}

//  base
export type BaseData = {
    id: string
    createdAt: string
    updatedAt: string
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

    subscription: UserWithSubscriptionData[]
    histories: UserWithHistoryData[]
    likes: UserWithLikeData[]
    comments: UserWithCommentData[]
    favourites: UserWithFavouriteData[]
    
}

export type UserWithSubscriptionData = BaseData &  {
    name: string
    status: string
}

export type UserWithHistoryData = BaseData & {
    animeId: string
    episode: string
    completed_list: string
}

export type UserWithCommentData = BaseData & {
    animeId: string
    comments: string
}

export type UserWithFavouriteData = BaseData & {
    animeId: string
    is_favourite: boolean
}

export type UserWithLikeData = BaseData & {
    animeId: string
    is_liked: boolean
}

// template response
export type ApiResponse<T, M = unknown> = {
    message: string
    success: boolean
    data: T
    metadata?: M
}

// func
export function toUserData({
    user,
    subscriptions = [],
    histories = [],
    likes = [],
    comments = [],
    favourites = [],
    token
}: ToUserDataProps ): UserData {
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

        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        
        subscription: subscriptions.map(toSubscriptionData),
        histories: histories.map(toHistoryData),
        likes: likes.map(toLikeData),
        comments: comments.map(toCommentData),
        favourites: favourites.map(toFavouriteData)

    }
}

export function toSubscriptionData(
    subscription: Subscription
): UserWithSubscriptionData {
    return {
        id: subscription.id,
        name: subscription.name,
        status: subscription.status,
        createdAt: subscription.createdAt.toISOString(),
        updatedAt: subscription.updatedAt.toISOString()
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
        createdAt: history.createdAt.toISOString(),
        updatedAt: history.updatedAt.toISOString()
    }
}

export function toLikeData(
    like: Like
): UserWithLikeData{
    return {
        id: like.id,
        animeId: like.animeId,
        is_liked: like.is_liked,
        createdAt: like.createdAt.toISOString(),
        updatedAt: like.updatedAt.toISOString()
    }
}

export function toCommentData(
    comment: Comment
): UserWithCommentData {
    return {
        id: comment.id,
        animeId: comment.animeId,
        comments: comment.comments,
        createdAt: comment.createdAt.toISOString(),
        updatedAt: comment.updatedAt.toISOString()
    }
}

export function toFavouriteData(
    favourite: Favourite
): UserWithFavouriteData {
    return {
        id: favourite.id,
        animeId: favourite.animeId,
        is_favourite: favourite.is_favourite,
        createdAt: favourite.createdAt.toISOString(),
        updatedAt: favourite.updatedAt.toISOString()
    }
}

// response wrapper template
export function toUserResponse(
  user: User,
  subscriptions: Subscription[],
  histories: History[],
  likes: Like[],
  comments: Comment[],
  favourites: Favourite[],
  message: string,
  token?: string
): ApiResponse<UserData> {
  return {
    success: true,
    message,
    data: toUserData({
      user,
      subscriptions,
      histories,
      likes,
      comments,
      favourites,
      token
    })
  };
}

export function toListUserResponse <T, U>(
    message: string,
    items: T[],
    mapper: (item: T) => U,
    total: number,
    page: number,
    limit: number
) : ApiResponse <U[], PaginationMeta> {
    return {
       success: true,
       message,
       data: items.map(mapper),
       metadata: buildPaginationMeta(page, limit, total)
    }
}


