import TopicModel from "../models/topic.model.js";
import ResponseError from "../responses/error.response.js";

export default class TopicService {
  // create topic service that will handle all topic related logic here
  // crud topic
  async createTopic(data) {
    try {
      return await TopicModel.create(data);
    } catch (error) {
      throw new ResponseError(error.message, error.code);
    }
  }

  async readTopic() {
    try {
      return await TopicModel.find();
    } catch (error) {
      throw new ResponseError(error.message, error.code);
    }
  }

  async updateTopic(id, data) {
    try {
      return await TopicModel.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
      throw new ResponseError(error.message, error.code);
    }
  }

  async deleteTopic(id) {
    try {
      return await TopicModel.findByIdAndDelete(id);
    } catch (error) {
      throw new ResponseError(error.message, error.code);
    }
  }

  async readTopicById(id) {
    try {
      return await TopicModel.findById(id);
    } catch (error) {
      throw new ResponseError(error.message, error.code);
    }
  }

  searchTopic = async ({ page, perPage, name, description }) => {
    try {
      return await TopicModel.find({
        where: {
          OR: [
            { name: { contains: name } },
            { description: { contains: description } },
          ],
        },
        limit: perPage,
        skip: (page - 1) * perPage,
      });
    } catch (error) {
      throw new ResponseError(error.message, error.code);
    }
  };
}
