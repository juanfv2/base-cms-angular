import {HasXFilePipe} from './has-x-file.pipe'

describe('Pipes/HasXFilePipe', () => {
  const pipe = new HasXFilePipe()
  it('create an instance', () => {
    expect(pipe).toBeTruthy()
  })

  it('should return url basic "not found" XFile empty', () => {
    expect(pipe.transform({})).toEqual('/api/file/e/f/0/0/0/---?rCountry=sv')
  })

  it('should return url basic  XFile from photo user', () => {
    const photo = {
      id: 5,
      entity: 'auth_users',
      entity_id: 1,
      field: 'photo',
      name: 'Bt1HLRHRWIe91CqXfrbCkckVVCyPQPE339nM45Hs.jpg',
      nameOriginal: 'FB_IMG_1569047209457.jpg',
      publicPath: '/storage/assets/adm/sv/auth_users/photo/Bt1HLRHRWIe91CqXfrbCkckVVCyPQPE339nM45Hs.jpg',
      extension: 'jpg',
      data: null,
    }
    expect(pipe.transform(photo)).toEqual(
      '/storage/assets/adm/sv/auth_users/photo/Bt1HLRHRWIe91CqXfrbCkckVVCyPQPE339nM45Hs.jpg?rCountry=sv'
    )
  })

  it('should return url basic XFile from photo user with dimensions', () => {
    const photo = {
      id: 5,
      entity: 'auth_users',
      entity_id: 1,
      field: 'photo',
      name: 'Bt1HLRHRWIe91CqXfrbCkckVVCyPQPE339nM45Hs.jpg',
      nameOriginal: 'FB_IMG_1569047209457.jpg',
      publicPath: '/storage/assets/adm/sv/auth_users/photo/Bt1HLRHRWIe91CqXfrbCkckVVCyPQPE339nM45Hs.jpg',
      extension: 'jpg',
      data: null,
    }
    const width = 500
    expect(pipe.transform(photo, width, width)).toEqual(
      `/api/file/${photo.entity}/${photo.field}/${photo.entity_id}/${width}/${width}/${photo.name}?rCountry=sv`
    )
  })
})
