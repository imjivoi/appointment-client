export default defineNuxtRouteMiddleware((to) => {
  const hasBusiness = true
  const excludeRoutes = ['dashboard-business-create', 'auth-login', 'auth-register']

  if (!excludeRoutes.includes(to.name) && !hasBusiness) {
    return navigateTo({ name: 'dashboard-business-create' }, { replace: true })
  }
})
