export const sessionService = {
  set: (sessionName: string, data: string) =>
    sessionStorage.setItem(sessionName, data),
  get: (sessionName: string) => sessionStorage.getItem(sessionName) || '',
  remove: (sessionName: string) => {
    const data = sessionStorage.getItem(sessionName);
    if (data) sessionStorage.removeItem(sessionName);
  },
};
