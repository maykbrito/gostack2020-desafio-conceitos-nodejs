const Router = require('express').Router;
const { uuid } = require('uuidv4');

const routesRepository = Router();

const repositories = [];

routesRepository.get('/', (request, response) => {
    return response.json( repositories )
});
  
routesRepository.post('/', (request, response) => {
    const { title, url, techs } = request.body

    const project = { id: uuid(), title, url, techs, likes: 0}

    repositories.push(project)

    return response.json( project )
});
  
routesRepository.put('/:id', (request, response) => {
    const { title, url, techs } = request.body
    const { id } = request.params
  
    let repository = repositories.find( repository => repository.id === id )
    if (!repository)
      return response.status(400).json({ error: 'Repository not found.' })
    
    repository = {...repository, title, url, techs}
  
    return response.json( repository )
});
  
routesRepository.delete('/:id', (request, response) => {
    const { id } = request.params
  
    const repositoryIndex = repositories.findIndex( repository => repository.id === id )
    if (repositoryIndex < 0)
      return response.status(400).json({ error: 'Repository not found.' })
  
    repositories.splice(repositoryIndex, 1)
  
    return response.status(204).send()
});
  
routesRepository.post('/:id/like', (request, response) => {
    const { id } = request.params
  
    const repository = repositories.find( repository => repository.id === id )
    
    if (!repository)
      return response.status(400).json({ error: 'Repository not found.' })
    
    repository.likes += 1
  
    return response.json(repository)
    
});

module.exports = routesRepository
  