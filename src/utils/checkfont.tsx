export const checkfont = (px:string, fontFamily: string) => {
  return document.fonts.check(`${px}px ${fontFamily}`)
}