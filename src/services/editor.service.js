import EditorModel from "../models/editor.model.js";
import ResponseError from "../responses/error.response.js";

export default class EditorService {
  // create editor service that will handle all editor related logic here
  // crud editor
  async createEditor(data) {
    try {
      return await EditorModel.create(data);
    } catch (error) {
      throw new ResponseError(error.message, error.code);
    }
  }

  async readEditor() {
    try {
      return await EditorModel.find();
    } catch (error) {
      throw new ResponseError(error.message, error.code);
    }
  }

  async updateEditor(id, data) {
    try {
      return await EditorModel.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
      throw new ResponseError(error.message, error.code);
    }
  }

  async deleteEditor(id) {
    try {
      return await EditorModel.findByIdAndDelete(id);
    } catch (error) {
      throw new ResponseError(error.message, error.code);
    }
  }

  async readEditorById(id) {
    try {
      return await EditorModel.findById(id);
    } catch (error) {
      throw new ResponseError(error.message, error.code);
    }
  }
}
