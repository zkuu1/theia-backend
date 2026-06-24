export default {
  validation: {
    required: "{field} wajib diisi",
    min: "{field} minimal harus {count} karakter",
    max: "{field} maksimal harus {count} karakter",
    email: "Alamat email tidak valid",

    fields: {
    name: "Nama",
    email: "Email",
    password: "Password",
  },
  },

  user: {
    created: "User berhasil dibuat",
    emailExists: "Email sudah digunakan",
    notFound: "User tidak ditemukan",
    banned: "User berhasil diblokir",
    unbanned: "User berhasil dibuka blokirnya",
  },

  auth: {
    loginSuccess: "Login berhasil",
    invalidCredentials: "Email atau password salah",
  },
} as const;