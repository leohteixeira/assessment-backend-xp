import components from './components'
import paths from './paths'
import schemas from './schemas'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Webjump backend test',
    description: 'This documentation is related to references to access and consume the API of the Webjump backend test.',
    contact: {
      name: 'Leonardo Teixeira',
      email: 'leohts.tec@hotmail.com'
    }
  },
  servers: [{
    url: '/'
  }],
  tags: [
    {
      name: 'Products',
      description: 'APIs related to products'
    }
  ],
  paths,
  schemas,
  components
}
