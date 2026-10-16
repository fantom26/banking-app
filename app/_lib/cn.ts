import { createCn } from 'cn/config'

export const cn = createCn({
  extend: {
    theme: {
      text: ['caption', 'body', 'title', 'stat', 'h1', 'h1-lg', 'hero', 'hero-lg'],
      shadow: ['card', 'raised', 'plastic']
    }
  }
})
