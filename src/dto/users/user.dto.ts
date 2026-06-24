import type {
  Subscription,
  History,
  Like,
  Comment,
  Favourite,
} from "@/generated/prisma/client";

import type { UserWithRelations } from "@/modules/users/user/user.repository";
import {
  type PaginationMeta,
  buildPaginationMeta,
} from "../pagination.dto";

// request dto

export type RegisterUserRequest = {
  name: string;
  email: string;
  password: string;


};

export type LoginUserRequest = {
  email: string;
  password: string;
};

// base

export type BaseData = {
  id: string;
  createdAt: string;
  updatedAt: string;
};

// relation dto

export type UserWithSubscriptionData = BaseData & {
  name: string;
  status: string;
};

export type UserWithHistoryData = BaseData & {
  animeId: string;
  episode: string;
  completedList: string;
};

export type UserWithCommentData = BaseData & {
  animeId: string;
  comments: string;
};

export type UserWithFavouriteData = BaseData & {
  animeId: string;
  isFavourite: boolean;
};

export type UserWithLikeData = BaseData & {
  animeId: string;
  isLiked: boolean;
};

// main

export type UserData = {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  publicId: string | null;
  role: string;
  level: number;
  xp: number;
  isBan: boolean;
  token?: string;

  createdAt: string;
  updatedAt: string;

  subscriptions: UserWithSubscriptionData[];
  histories: UserWithHistoryData[];
  likes: UserWithLikeData[];
  comments: UserWithCommentData[];
  favourites: UserWithFavouriteData[];
};

// wrapper

export type ApiResponse<T, M = never> = {
  success: boolean;
  message: string;
  data: T;
  metadata?: M;
};

// mapper

export function toSubscriptionData(
  subscription: Subscription
): UserWithSubscriptionData {
  return {
    id: subscription.id,
    name: subscription.name,
    status: subscription.status,
    createdAt: subscription.createdAt.toISOString(),
    updatedAt: subscription.updatedAt.toISOString(),
  };
}

export function toHistoryData(
  history: History
): UserWithHistoryData {
  return {
    id: history.id,
    animeId: history.animeId,
    episode: history.episode,
    completedList: history.completedList,
    createdAt: history.createdAt.toISOString(),
    updatedAt: history.updatedAt.toISOString(),
  };
}

export function toLikeData(
  like: Like
): UserWithLikeData {
  return {
    id: like.id,
    animeId: like.animeId,
    isLiked: like.isLiked,
    createdAt: like.createdAt.toISOString(),
    updatedAt: like.updatedAt.toISOString(),
  };
}

export function toCommentData(
  comment: Comment
): UserWithCommentData {
  return {
    id: comment.id,
    animeId: comment.animeId,
    comments: comment.comments,
    createdAt: comment.createdAt.toISOString(),
    updatedAt: comment.updatedAt.toISOString(),
  };
}

export function toFavouriteData(
  favourite: Favourite
): UserWithFavouriteData {
  return {
    id: favourite.id,
    animeId: favourite.animeId,
    isFavourite: favourite.isFavourite,
    createdAt: favourite.createdAt.toISOString(),
    updatedAt: favourite.updatedAt.toISOString(),
  };
}

export function toUserData(
  user: UserWithRelations,
  token?: string
): UserData {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    image: user.image,
    publicId: user.publicId,
    role: user.role,
    level: user.level,
    xp: user.xp,
    isBan: user.isBan,
    token,

    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),

    subscriptions: user.subscriptions.map(
      toSubscriptionData
    ),
    histories: user.histories.map(
      toHistoryData
    ),
    likes: user.likes.map(
      toLikeData
    ),
    comments: user.comments.map(
      toCommentData
    ),
    favourites: user.favourites.map(
      toFavouriteData
    ),
  };
}

export function toUserResponse(
  user: UserWithRelations,
  message: string,
  token?: string
): ApiResponse<UserData> {
  return {
    success: true,
    message,
    data: toUserData(user, token),
  };
}

export function toListUserResponse<T, U>(
  message: string,
  items: T[],
  mapper: (item: T) => U,
  total: number,
  page: number,
  limit: number
): ApiResponse<U[], PaginationMeta> {
  return {
    success: true,
    message,
    data: items.map(mapper),
    metadata: buildPaginationMeta(
      page,
      limit,
      total
    ),
  };
}