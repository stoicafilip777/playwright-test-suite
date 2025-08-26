export const isDesktopVieport = (page) => {
    const size = page.viewportSize()
    return size.width >= 600 
}