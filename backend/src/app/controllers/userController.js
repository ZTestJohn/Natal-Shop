import userRepository from "../repositories/userRepository.js";

class userController {

  async index(request, response) {
    const row = await userRepository.findAll()
    response.json(row)
  }

  async show(request, response) {
    const id = request.params.id;
    const row = await userRepository.findById(id)
    response.json(row)
  }

  async store(request, response) {
    const body = request.body;
    const row = await userRepository.create(body)
    response.json(row)
  }

  async update(request, response) {
    const body = request.body;
    const id = request.params.id;
    const row = await userRepository.update(body, id)
    response.json(row)
  }

  async delete(request, response) {
    const id = request.params.id;
    const row = await userRepository.delete(id)
    response.json(row)
    
  }
  
}

// Padrão Singleton
export default new userController();
