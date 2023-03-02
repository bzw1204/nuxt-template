import { get } from '../utils/http/fetch'

// eslint-disable-next-line import/prefer-default-export
export function getDictCache() {
  return get('/dict/init/cache')
}
