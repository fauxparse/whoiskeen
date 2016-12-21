export const SIDEBAR = 'SIDEBAR'

export function showSidebar(visible = true) {
  return { type: SIDEBAR, visible }
}

export function toggleSidebar() {
  return { type: SIDEBAR }
}
