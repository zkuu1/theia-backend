export default {
  validation: {
    required: "{field}を入力してください",
    min: "{field}は{count}文字以上で入力してください",
    max: "{field}は{count}文字以内で入力してください",
    email: "メールアドレスの形式が正しくありません",

    fields: {
      name: "名前",
      email: "メールアドレス",
      password: "パスワード",
    },
  },

  user: {
    created: "ユーザーが正常に作成されました",
    emailExists: "このメールアドレスは既に使用されています",
    notFound: "ユーザーが見つかりません",
    banned: "ユーザーを利用停止にしました",
    unbanned: "ユーザーの利用停止を解除しました",
  },

  auth: {
    loginSuccess: "ログインしました",
    invalidCredentials:
      "メールアドレスまたはパスワードが正しくありません",
    unauthorized:
      "アクセス権限がありません",
  },
} as const;