export function login({ email, password }) {
  return new Promise((resolve) => {
    resolve({
      data: {
        accessToken: "Anggep aja token",
      },
    });
  });
}
