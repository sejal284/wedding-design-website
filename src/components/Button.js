import { createElement } from 'react'

function Button({ children = 'Button' }) {
  return createElement('button', { type: 'button' }, children)
}

export default Button
