import AbstractService from "../services/abstract.service.js";
import ResponseError from "../responses/error.response.js";
import ResponseApi from "../responses/api.response.js";
import * as abstractValidate from "../validate/abstract.validate.js";

export default class AbstractController {
  service = new AbstractService();

  // get all abstracts and apply pagination
  getAbstracts = async (req, res, next) => {
    try {
      // validate the query parameters
      const { value, error } = abstractValidate.abstractSearchSchema.validate(
        req.query
      );

      if (error) {
        throw new ResponseError(error.message, 400);
      }
      const pagination = {
        page: value.page,
        perPage: value.perPage,
        total: await this.service.countSearchAbstracts(value),
      };
      // call the service
      const abstracts = await this.service.searchAbstracts(value);
      // send the response
      return ResponseApi.success(res, abstracts, pagination);
    } catch (error) {
      return next(error);
    }
  };

  // create a new abstract by admin
  createAbstract = async (req, res, next) => {
    try {
      // validate the request body
      const { value, error } = abstractValidate.abstractCreateSchema.validate(
        req.body
      );
      if (error) {
        throw new ResponseError(error.message, 400);
      }
      // call the servic
      const abstract = await this.service.createAbstract(value);
      // send the response
      return ResponseApi.created(res, abstract);
    } catch (error) {
      return next(error);
    }
  };

  // update abstract by user
  updateAbstract = async (req, res, next) => {
    try {
      // validate the request body
      const { value, error } = abstractValidate.abstractUpdateSchema.validate(
        req.body
      );
      if (error) {
        throw new ResponseError(error.message, 400);
      }
      // call the service
      const abstract = await this.service.updateAbstract(req.params.id, value);
      // send the response
      return ResponseApi.success(res, abstract);
    } catch (error) {
      return next(error);
    }
  };

  // delete abstract by user
  deleteAbstract = async (req, res, next) => {
    try {
      // call the service
      await this.service.deleteAbstract(req.params.id);
      // send the response
      return ResponseApi.success(res, null, null, 204);
    } catch (error) {
      return next(error);
    }
  };

  // get abstract by id
  getAbstract = async (req, res, next) => {
    try {
      // call the service
      const abstract = await this.service.getAbstract(req.params.id);
      // send the response
      return ResponseApi.success(res, abstract);
    } catch (error) {
      return next(error);
    }
  };

  // get abstract by user
  getAbstractByUser = async (req, res, next) => {
    try {
      // call the service
      const abstract = await this.service.getAbstractByUser(req.user.id);
      // send the response
      return ResponseApi.success(res, abstract);
    } catch (error) {
      return next(error);
    }
  };

  // get abstract by field
  getAbstractByField = async (req, res, next) => {
    try {
      // validate the query parameters

      const { value, error } = abstractValidate.abstractSearchSchema.validate(
        req.query
      );

      if (error) {
        throw new ResponseError(error.message, 400);
      }

      // call the service
      const abstract = await this.service.readAbstractByFields(value);
      // send the response
      return ResponseApi.success(res, abstract);
    } catch (error) {
      return next(error);
    }
  };

  // get abstract by user login
  getAbstractByUser = async (req, res, next) => {
    try {
      // call the service
      const abstract = await this.service.readAbstractByUser(req.user.id);
      // send the response
      return ResponseApi.success(res, abstract);
    } catch (error) {
      return next(error);
    }
  };

  deleteAbstract = async (req, res, next) => {
    try {
      // call the service
      await this.service.deleteAbstract(req.params.id);
      // send the response
      return ResponseApi.noContent(res);
    } catch (error) {
      return next(error);
    }
  };
  getAbstractById = async (req, res, next) => {
    try {
      // call the service
      const abstract = await this.service.getAbstract(req.params.id);
      // send the response
      return ResponseApi.success(res, abstract);
    } catch (error) {
      return next(error);
    }
  };
}
