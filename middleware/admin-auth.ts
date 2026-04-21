export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server) return

  const token = localStorage.getItem('admin_token')
  const isLoginPage = to.path === '/admin/login'
  const isAdminPage = to.path.startsWith('/admin')

  if (!token && isAdminPage && !isLoginPage) {
    return navigateTo('/admin/login')
  }

  if (token && isLoginPage) {
    return navigateTo('/admin/experiences')
  }
})